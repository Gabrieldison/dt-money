import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import App from "./App";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "freelance de website",
          type: "deposit",
          category: "dev",
          amount: 6000,
          createdAt: new Date("13/11/2021"),
        },
        {
          id: 2,
          title: "conta de luz",
          type: "withdraw",
          category: "dev",
          amount: 600,
          createdAt: new Date("17/11/2021"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
