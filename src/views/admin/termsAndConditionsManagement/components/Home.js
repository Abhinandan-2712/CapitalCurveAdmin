import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Add from "./Add";
import Card from "components/card";

// import axios from 'axios';

function Home() {
  useEffect(() => {
    viewPost();
  }, []);

  const [ispost, setpost] = useState([]);
  const viewPost = async () => {
    // try {
    //   await axios.get(`http://localhost:8080/allPost`,)
    //   .then(res => {
    //     if(res.data.success === true){
    //       setpost(res.data.listall);
    //     }
    //   })
    // } catch (error) { throw error;}
  };

  return (
    <div className="App ">
      <div className="container ">
        <div className="row">
          <Card extra={"w-full sm:overflow-auto px-6 mt-4"}>
            <header className="relative flex items-center justify-between pt-4">
              <div
                Codes
                className="text-xl font-bold text-navy-700 dark:text-white"
              >
                Term And Conditions
              </div>
            </header>
            <div className=" overflow-x-scroll ">
              <Add />
            </div>
          </Card>
          {/* <h1 className="App__tittle"> React <span> Quill </span> powerful rich text editor </h1> */}
          {/* <Link to="/Add" className="btn btn__theme btn__add"> Create Now </Link> */}

          {ispost.map((item, index) => (
            <div className="post__list" key={index}>
              <h2>{item.title}</h2>

              <div
                className="post__description"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              {/* <div className="post__description" dangerouslySetInnerHTML={{ __html: item.information}}  /> */}
              <Link to={`/Edit/${item.id}`} className="btn btn__theme">
                {" "}
                Edit{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
