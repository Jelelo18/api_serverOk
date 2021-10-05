const Repository = require('../models/Repository');
const collectionManager = require('../managers/collectionManager');

module.exports =
    class BookmarksController extends require("./Controller") {
        constructor(req, res) {
            super(req, res);
            this.bookmarksRepository = new Repository('Bookmarks');
        }
        getAll() {
            this.response.JSON(this.bookmarksRepository.getAll());
        }
        get(id) {
            let params = this.getQueryStringParams();

            if (!isNaN(id))
                this.response.JSON(this.bookmarksRepository.get(id));
            else if(params == null){
                this.response.JSON(this.bookmarksRepository.getAll());
            }else{
                if (this.checkParams(params)){

                    console.log("params ok");
                    this.doOperation(params);
                }
            }
        }
        post(bookmark){
            //validate
            //avoid duplicates

            let newBookmark = this.bookmarksRepository.add(bookmark);
            if(newBookmark)
                this.response.created(JSON.stringify(newBookmark));
            else
                this.response.internalError();

        }
        put(bookmark){
            //validate

            if(this.bookmarksRepository.update(bookmark))
                this.response.ok();
            else
                this.response.notFound();
        }
        remove(id){
            if(this.bookmarksRepository.remove(id))
                this.response.accepted();
            else
                this.response.notFound();
        }
        sortName() {
            this.response.JSON(this.bookmarksRepository.sortName());
        }
        sortCategory() {
            this.response.JSON(this.bookmarksRepository.sortCategory());
        }
        nameStartsWith(name) {
            this.response.JSON(this.bookmarksRepository.nameStartsWith(name));
        }
        searchByName(name) {
            this.response.JSON(this.bookmarksRepository.searchByName(name));
        }
        searchByCategory(category) {
            this.response.JSON(this.bookmarksRepository.searchByCategory(category));
        }
        process(params) {
            this.response.JSON(this.bookmarksRepository.process(params));
        }

        checkParams(params) {

            let paramsOk = true;
            if ('sort' in params){
                if (params.sort == null || params.sort == "") {
                    
                    this.response.JSON({ 'error': 'missing sort parameter' });
                    paramsOk = false;
                }
            }
            if ('name' in params){
                if (params.name == null || params.name == "") {
                    
                    this.response.JSON({ 'error': 'missing name parameter' });
                    paramsOk = false;
                }
            }
            if ('category' in params)
            {
                if (params.category == null || params.category == "") {
                    
                    this.response.JSON({ 'error': 'missing category parameter' });
                    paramsOk = false;
                }
            }

            console.log(paramsOk);
            return paramsOk;
        }
        doOperation(params) {
            this.process(params);
        }
    }