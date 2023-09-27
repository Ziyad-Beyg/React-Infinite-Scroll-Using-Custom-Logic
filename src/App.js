import "./App.css";
import Loading from "./components/Loading.jsx";
import Item from "./components/Item";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getItemsData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
    );
    const data = await res.json();
    console.log(data, "hi");
    setItems((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    getItemsData();
  }, [page]);

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    console.log(
      window.innerHeight + document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      page
    );
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <>
      <div className="container">
        <div className="navbar">NAVBAR (STICKY)</div>
        <main className="sub-component">
          <div className="left">
            <p>
              Manage Your <br />
              Notifications
            </p>
            <p className="settingText">View Settings</p>
          </div>
          <div className="middle">
            {/* MIDDLE SECTION (SCROLLABLE) */}
            <div className="feedHeader">
              <button>All</button>
              <button>My Posts</button>
              <button>Mentions</button>
            </div>

            <div className="feedPost">
              {items.map((curVal, id) => {
                return <Item key={id} myData={curVal} />;
              })}
              {loading && <Loading />}
            </div>
          </div>
          <div className="right">
            <div>
              <a className="link">About</a>
              <a className="link">Accessiblity</a>
              <a className="link">Help Center</a>
              <br />
              <a className="link">Privacy & Terms</a>
              <a className="link">Ad Choices</a>
              <br />
              <a className="link">Advertising</a>
              <a className="link">Business Services</a>
              <br />
              <a className="link">Get The LinkedIn App</a>
              <a className="link">More</a>
              <br />
            </div>
            <div className="imageDiv">
              <img
                src="https://static.licdn.com/sc/h/47josflhxdz9o3v227aa72l1p"
                alt="linkedIn Image"
              />
              <p className="imageText">LinkedIn Corporation © 2023</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
