var express = require("express");
var app = express();
var db = require("./db.json");

// Defines response obj for the get request with params of pagination
var getGraphicsCardsObj = { data: null, paginationInfo: {pageCurrent: 0, pageTotal: 0, entriesCurrent: 0, entriesTotal: 0}};
// Defines the default num of entries per page. It will be changed if there is "numResults" as a query param
var getGraphicsCardsNumEntriesPerPage = 3;

app.get("/graphics-cards", (req, res, next) => {
    if (req.query.page != null && req.query.page != undefined) {
        // Exists the query param "page" so it only loads the nth page
        var numOfEntriesPerPage = getGraphicsCardsNumEntriesPerPage;

        if (req.query.numResults != null && req.query.numResults != undefined && req.query.numResults > 0) {
            // Exists the query param "numResults" so we set it as the number of entries per page
            numOfEntriesPerPage = parseInt(req.query.numResults);
        }

        // Makes calculations about pagination and saves them in variables
        var totalPages = Math.ceil(db.length / numOfEntriesPerPage) < 1 ? 1 : Math.ceil(db.length / numOfEntriesPerPage);

        // Normalization of the page number request
        var pageSelected = parseInt(req.query.page) || 1;
        if (pageSelected < 1) {
            pageSelected = 1;
        } else if (pageSelected > totalPages) {
            pageSelected = totalPages;
        }

        var firstElementIndex = pageSelected * numOfEntriesPerPage - numOfEntriesPerPage;
        var lastElementIndex = firstElementIndex + numOfEntriesPerPage > db.length ? db.length : firstElementIndex + numOfEntriesPerPage;

        // Slices the db, returns the entries and then they are saved in entriesList
        var entriesList = db.slice(firstElementIndex, lastElementIndex);

        // Finally we build the object result with the entries data and the pagination info
        var resultObj = {data: entriesList, paginationInfo: {pageCurrent: pageSelected, pageTotal: totalPages, entriesCurrent: entriesList.length, entriesTotal: db.length}}

        res.json(resultObj);
    } else {
        // Query was executed without pagination params, so it sends the full array of elements
        res.json(db);
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});