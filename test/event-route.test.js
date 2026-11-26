import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";

test("the events listing's card link resolves to the event detail route", async () => {
  const vite = await createServer({ server: { middlewareMode: true, ws: false }, appType: "custom" });
  try {
    const { default: EventGrid } = await vite.ssrLoadModule("/src/components/sections/events/EventGrid.jsx");
    const { default: EventCard } = await vite.ssrLoadModule("/src/components/sections/events/EventCard.jsx");
    const { default: AppRoutes } = await vite.ssrLoadModule("/src/routes/AppRoutes.jsx");
    const { AuthProvider } = await vite.ssrLoadModule("/src/context/AuthContext.jsx");
    const { CartProvider } = await vite.ssrLoadModule("/src/context/CartContext.jsx");
    const fixture = { _id: "000000000000000000000001", title: "Festival fixture", price: 0 };
    const render = (path, child) =>
      renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] }, child));
    const routes = createElement(AuthProvider, null,
      createElement(CartProvider, null, createElement(AppRoutes)));
    const listing = render("/events", createElement(EventGrid, { events: [fixture] }));
    const detailLink = listing.match(/href="(\/events\/[^"]+)"/)?.[1];
    assert.equal(detailLink, `/events/${fixture._id}`);
    assert.match(render(detailLink, routes), /Loading Event\.\.\./);
    assert.match(render("/events/invalid", routes), /Event Not Found/);

    const placeholder = render("/events", createElement(EventCard, { title: "Preview" }));
    assert.doesNotMatch(placeholder, /View Details/);
  } finally {
    await vite.close();
  }
});
