import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getVan } from "../../api";

export default function VanDetail() {
  const [van, setVan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();
  const location = useLocation();

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVan(id);
        setVan(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      {van && (
        <div className="van-detail">
          <img
            src={van.imageUrl}
            style={{
              width: "80%" /* Reduced width for better scaling */,
              maxWidth: "500px" /* Added max-width to limit size */,
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          />
          <i
            className={`van-type ${van.type} selected`}
            style={{
              fontSize:
                "1.5rem" /* Increased font size for better readability */,
              padding: "8px 15px" /* Adjusted padding for better proportions */,
              borderRadius: "5px",
              backgroundColor: "#ffead0",
              color: "#4d4d4d",
            }}
          >
            {van.type}
          </i>
          <h2 style={{ fontSize: "2.5rem", margin: "20px 0" }}>{van.name}</h2>
          <p
            className="van-price"
            style={{
              fontSize: "1.75rem" /* Increased font size for better emphasis */,
              fontWeight: "bold",
              marginBottom: "15px" /* Adjusted margin for spacing */,
            }}
          >
            <span>${van.price}</span>/day
          </p>
          <p style={{ lineHeight: "1.8", marginBottom: "25px" }}>
            {van.description}
          </p>
          <button
            className="link-button"
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff8c38",
              color: "white",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Rent this van
          </button>
        </div>
      )}
    </div>
  );
}
