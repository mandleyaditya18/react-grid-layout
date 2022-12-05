import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Widget from "./Widget";

const ResponsiveGridLayout = WidthProvider(Responsive);

const originalItems = [
  { cardId: "1", cardType: "a", content: "A" },
  { cardId: "2", cardType: "b", content: "B" },
  { cardId: "3", cardType: "c", content: "C" },
  { cardId: "4", cardType: "d", content: "D" },
];

const GridLayout = () => {
  const [items, setItems] = useState(originalItems);

  //   layouts can be set to empty array as well, items will stack in 1st col in that case
  const [layouts, setLayouts] = useState([
    { i: "1", x: 0, y: 0, w: 1, h: 2 },
    { i: "2", x: 1, y: 0, w: 3, h: 2 },
    { i: "3", x: 4, y: 0, w: 1, h: 2 },
    { i: "4", x: 5, y: 0, w: 1, h: 2 },
  ]);

  const onLayoutChange = (layout) => {
    setLayouts(layout);
  };

  const addItemHandler = () => {
    const randomNumber = Math.floor(Math.random() * 100).toString();
    const newItems = [
      ...items,
      {
        cardId: randomNumber,
        cardType: randomNumber,
        content: randomNumber,
      },
    ];
    setItems(newItems);
    const newLayouts = [
      ...layouts,
      { i: randomNumber, x: 0, y: 9999999, w: 1, h: 2 },
    ];
    setLayouts(newLayouts);
  };

  const removeItemHandler = (item) => {
    setItems(items.filter((i) => i.cardId !== item.cardId));
  };

  return (
    <>
      <div className="mb-4 px-4 py-2">
        <button className="bg-[#ccc] py-2 px-4" onClick={addItemHandler}>
          Add item
        </button>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: [...layouts] }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 1, xxs: 1 }}
        rowHeight={60}
        width={1400}
        onLayoutChange={onLayoutChange}
      >
        {items.map((item) => (
          <div key={item.cardId} className="border border-black flex">
            <Widget id={item.cardId} item={item} />
            <div
              className="border border-slate-400 rounded-full w-fit h-fit p-1 relative cursor-pointer"
              onClick={() => removeItemHandler(item)}
              aria-hidden
            >
              X
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
};

export default GridLayout;
