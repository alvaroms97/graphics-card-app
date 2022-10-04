var express = require("express");
var app = express();
var db = require("./db.json");

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Defines response obj for the get request with params of pagination
var getGraphicsCardsObj = { data: null, paginationInfo: { pageCurrent: 0, pageTotal: 0, entriesCurrent: 0, entriesTotal: 0 } };
// Defines the default num of entries per page. It will be changed if there is "numResults" as a query param
var getGraphicsCardsNumEntriesPerPage = 3;

app.get("/graphics-cards", (req, res, next) => {
    if (req.query.id != null && req.query.id != undefined) {
        // Exists the query param "id" so it sends the element with that Id
        var idSearchResult = db.find(x => x.id == req.query.id);
        res.json(idSearchResult)
    } else if (req.query.page != null && req.query.page != undefined) {
        // Exists the query param "page" so it only loads the nth page

        var dbEntries = db;
        if (req.query.search != null && req.query.search != undefined) {
            // Exists the query param "search" so we filter by this search term, including all that matches its name, model or manufacturer
            var search = req.query.search.toLowerCase() 
            dbEntries = dbEntries.filter(x => x.name.toLowerCase().includes(search) || x.model.toLowerCase().includes(search) || x.manufacturer.toLowerCase().includes(search));
        }

        var numOfEntriesPerPage = getGraphicsCardsNumEntriesPerPage;

        if (req.query.numResults != null && req.query.numResults != undefined && req.query.numResults > 0) {
            // Exists the query param "numResults" so we set it as the number of entries per page
            numOfEntriesPerPage = parseInt(req.query.numResults);
        }

        // Makes calculations about number of pages and saves them in a variable
        var totalPages = Math.ceil(dbEntries.length / numOfEntriesPerPage) < 1 ? 1 : Math.ceil(dbEntries.length / numOfEntriesPerPage);

        // Normalization of the page number request
        var pageSelected = parseInt(req.query.page) || 1;
        if (pageSelected < 1) {
            pageSelected = 1;
        } else if (pageSelected > totalPages) {
            pageSelected = totalPages;
        }

        var firstElementIndex = pageSelected * numOfEntriesPerPage - numOfEntriesPerPage;
        var lastElementIndex = firstElementIndex + numOfEntriesPerPage > dbEntries.length ? dbEntries.length : firstElementIndex + numOfEntriesPerPage;

        // Slices the db, returns the entries and then they are saved in entriesList
        var entriesList = dbEntries.slice(firstElementIndex, lastElementIndex);

        // Finally we build the object result with the entries data and the pagination info
        var resultObj = { data: entriesList, paginationInfo: { pageCurrent: pageSelected, pageTotal: totalPages, entriesCurrent: entriesList.length, entriesTotal: dbEntries.length } }

        res.json(resultObj);
    } else {
        // Query was executed without pagination params nor search params, so it sends the full array of elements
        res.json(db);
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});