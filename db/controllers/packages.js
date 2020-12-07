
  const models = require('../models/index.js');
  const dbModel = models.Package;
  const modelName = 'Package';

  /** 
   * ====================================================
   * @route /
   * @method POST
   * @description Create a Record in database
   * ====================================================
   */
  exports.createOne = async (req, res) => {
    let _insert = req.body;
    try {
      let _res = await dbModel.query().insert(_insert);
      res.send({
        links: {
          self: req.originalUrl
        },
        meta: {
          "copyright": "Copyright 2020 StudyApps.",
        },
        data: _res ? _res : null,
        jsonapi: {
          "version": "1.0"
        }
    })
    } catch (err) {
      res.send({
        errors: [
          {
            title: "Error occurred while adding a Record in the database.",
            meta: {
              name: err ? err.name: null,
              nativeError: {
                code: err.nativeError ? err.nativeError.code: null,
                sqlMessage: err.nativeError ? err.nativeError.sqlMessage: null,
              }
            }
          }
        ]
      })
    }
  };

  /**
   * ====================================================
   * @route /:id
   * @method GET
   * @description Get a Record by id
   * ====================================================
   */
  exports.getOne = async (req, res) => {
    try {
      let _res = await dbModel.query().findById(req.params.id);
      res.send({
        links: {
          self: req.originalUrl
        },
        meta: {
          "copyright": "Copyright 2020 StudyApps.",
        },
        data: _res ? _res : null,
        jsonapi: {
          "version": "1.0"
        }
    });
    } catch(err) {
      res.send({
        errors: [
          {
            title: "Failed to get a Record with id = " + req.params.id,
            meta: {
              name: err ? err.name: null,
              nativeError: {
                code: err.nativeError ? err.nativeError.code: null,
                sqlMessage: err.nativeError ? err.nativeError.sqlMessage: null,
              }
            }
          }
        ]
      });  
    }
  };

  /**
   * ====================================================
   * @route /:id
   * @method PUT
   * @description Update a Record by id
   * ====================================================
   */
  exports.updateOne = async (req, res) => {
    try {
      let _insert = req.body;
      let _res = await dbModel.query().patchAndFetchById(req.params.id, _insert);
      res.send({
        links: {
          self: req.originalUrl
        },
        meta: {
          "copyright": "Copyright 2020 StudyApps.",
        },
        data: _res ? _res : null,
        jsonapi: {
          "version": "1.0"
        }
      });  
    } catch(err) {
      res.send({
        errors: [
          {
            title: "Failed to update the Record with id = " + req.params.id,
            meta: {
              name: err ? err.name: null,
              nativeError: {
                code: err.nativeError ? err.nativeError.code: null,
                sqlMessage: err.nativeError ? err.nativeError.sqlMessage: null,
              }
            }
          }
        ]
      });  
    }
  };

  /**
   * ====================================================
   * @route /:id
   * @method DELETE
   * @description Delete a record by id
   * ====================================================
   */
  exports.deleteOne = async (req, res) => {
    try {
      let _res = await dbModel.query().deleteById(req.params.id);
      res.send({
        links: {
          self: req.originalUrl
        },
        meta: {
          "copyright": "Copyright 2020 StudyApps.",
        },
        data: {
          id: _res ? req.params.id : null
        },
        jsonapi: {
          "version": "1.0"
        }
      });  
    } catch(err) {
      res.send({
        errors: [
          {
            title: "Failed to delete the Record with id = " + req.params.id,
            meta: {
              name: err ? err.name: null,
              nativeError: {
                code: err.nativeError ? err.nativeError.code: null,
                sqlMessage: err.nativeError ? err.nativeError.sqlMessage: null,
              }
            }
          }
        ]
      });  
    }
  };
  

  /**
   * ====================================================
   * @route /
   * @method GET
   * @description Get all the records
   * ====================================================
   */
  exports.getAll = async (req, res) => {

    // base variables
    let filterQuery = {};
    let filterIncludes = [];
    let filterOrder = [['id', 'ASC']];

    // construct query
    try {
      let _res = dbModel.query();
        if(req.query.title) {
          _res = _res.where('title', 'like', '%' + req.query.title + '%')
        }
        
        if(req.query.description) {
          _res = _res.where('description', 'like', '%' + req.query.description + '%')
        }
        
        if(req.query.npm_command) {
          _res = _res.where('npm_command', 'like', '%' + req.query.npm_command + '%')
        }
        
        if(req.query.npm_url) {
          _res = _res.where('npm_url', 'like', '%' + req.query.npm_url + '%')
        }
        
        if(req.query.github_url) {
          _res = _res.where('github_url', 'like', '%' + req.query.github_url + '%')
        }
        
        if(req.query.belongs_to) {
          _res = _res.where('belongs_to', 'like', '%' + req.query.belongs_to + '%')
        }
        
        if(req.query.type) {
          _res = _res.where('type', 'like', '%' + req.query.type + '%')
        }
        
        if(req.query.tags) {
          _res = _res.where('tags', 'like', '%' + req.query.tags + '%')
        }
        
        _res = await _res;
      
        // return response
        res.send({
          links: {
            self: req.originalUrl
          },
          meta: {
            "copyright": "Copyright 2020 StudyApps.",
          },
          data: _res,
          jsonapi: {
            "version": "1.0"
          }
        });
    } catch(err) {
      res.send({
        errors: [
          {
            title: "Failed to get Records",
            meta: {
              name: err ? err.name: null,
              nativeError: {
                code: err.nativeError ? err.nativeError.code: null,
                sqlMessage: err.nativeError ? err.nativeError.sqlMessage: null,
              }
            }
          }
        ]
      }) 
    }
  };
