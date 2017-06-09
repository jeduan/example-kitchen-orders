-- Up
CREATE TABLE couriers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  courierId INTEGER,
  name TEXT,
  address TEXT,
  eta DATETIME,
  active BOOLEAN DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT orders_fk_courierId FOREIGN KEY (courierId)
    REFERENCES couriers (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE INDEX "orders_ix_courierId" ON "orders" ("courierId");
CREATE INDEX "orders_ix_active" ON "orders" ("active");

-- Down
DROP INDEX orders_ix_courierId;
DROP INDEX orders_ix_active;
DROP TABLE couriers;
DROP TABLE orders;
