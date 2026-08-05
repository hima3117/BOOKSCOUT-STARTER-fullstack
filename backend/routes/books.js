import express from "express";

const router = express.Router();

const cache = new Map();


// ---------------- OPEN LIBRARY ----------------

async function getOpenLibrary(query, page = 1, limit = 12) {

  try {

    const url =
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;


    console.log("OPENLIBRARY:", url);


    const response = await fetch(url);


    if (!response.ok) {

      throw new Error(
        `OpenLibrary ${response.status}`
      );

    }


    return await response.json();


  } catch (error) {

    console.log(
      "OPENLIBRARY ERROR:",
      error.message
    );

    return null;

  }

}



// ---------------- GOOGLE BOOKS ----------------

async function getGoogleBooks(query) {

  try {

    const url =
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12`;


    console.log(
      "GOOGLE:",
      url
    );


    const response =
      await fetch(url);


    if (!response.ok) {

      throw new Error(
        `Google ${response.status}`
      );

    }


    const data =
      await response.json();



    return {

      numFound:
        data.totalItems || 0,


      docs:

      data.items?.map((item)=>({

        key:
          `/works/${item.id}`,


        title:
          item.volumeInfo.title || "Untitled",


        author_name:
          item.volumeInfo.authors || [
            "Unknown Author"
          ],


        first_publish_year:
          item.volumeInfo.publishedDate || "N/A",


        subject:
          item.volumeInfo.categories || [
            "General"
          ],


        edition_count:1,


        isbn:[],


        cover_i:null,


        cover_url:
          item.volumeInfo.imageLinks?.thumbnail || null


      })) || []

    };


  } catch(error){


    console.log(
      "GOOGLE ERROR:",
      error.message
    );


    return {

      numFound:0,

      docs:[]

    };

  }

}




// ---------------- ROUTE ----------------


router.get("/search", async(req,res)=>{


  try {


    const query =
      (
        req.query.query ||
        req.query.subject ||
        "javascript"
      )
      .trim();



    const page =
      Number(req.query.page) || 1;


    const limit =
      Number(req.query.limit) || 12;



    const key =
      `${query.toLowerCase()}_${page}_${limit}`;



    if(cache.has(key)){


      console.log(
        "CACHE HIT:",
        key
      );


      return res.json(
        cache.get(key)
      );

    }





    let data =
      await getOpenLibrary(
        query,
        page,
        limit
      );





    if(
      !data ||
      !data.docs ||
      data.docs.length === 0
    ){


      console.log(
        "USING GOOGLE FALLBACK"
      );


      data =
        await getGoogleBooks(query);


    }





    cache.set(
      key,
      data
    );



    res.json(data);



  } catch(error){


    console.log(
      "SEARCH ERROR:",
      error.message
    );


    res.status(500).json({

      message:
      "Search failed"

    });


  }


});



export default router;