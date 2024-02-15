import React from "react";
import { useParams } from "react-router-dom";

const ViewOrUpdateFeatured = () => {
    const {id} = useParams()



    return (
        <div>
            <h1>Featured</h1>
            <form>
                <input type="text" name="title" placeholder="Featured Title" />
                <input type="text" name="destURL" placeholder="Featured DestUrl" />
            </form>
        </div>
    )
}

export default ViewOrUpdateFeatured;