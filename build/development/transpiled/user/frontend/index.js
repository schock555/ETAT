"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _oauth = _interopRequireDefault(require("oauth-1.0a"));

var _ui = require("@airtable/blocks/ui");

var _blocks = require("@airtable/blocks");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Entry point - main block
function EtsyListingBlock() {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      selectedRecordId = _useState2[0],
      setSelectedRecordId = _useState2[1];

  var globalConfig = (0, _ui.useGlobalConfig)();
  (0, _ui.useLoadable)(_blocks.cursor); // If multiple records selected use the first one

  (0, _ui.useWatchable)(_blocks.cursor, ['selectedRecordIds'], function () {
    if (_blocks.cursor.selectedRecordIds.length > 0) {
      setSelectedRecordId(_blocks.cursor.selectedRecordIds[0]);
    }
  });
  var base = (0, _ui.useBase)();
  var table = base.getTable('Etsy Listings');
  var content;

  if (!(globalConfig.get('etsyOathToken') && globalConfig.get('etsyOathSecret'))) {
    // If there's no linked Etsy Account
    content = /*#__PURE__*/_react.default.createElement(AuthBlock, null);
  } else if (_blocks.cursor.activeTableId !== table.id || !selectedRecordId) {
    // If no record selected
    content = /*#__PURE__*/_react.default.createElement(_ui.Box, {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4
    }, /*#__PURE__*/_react.default.createElement(_ui.Text, {
      fontSize: 32,
      padding: 2
    }, 'Etsy for Airtable'), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      fontStyle: "italic",
      padding: 2
    }, 'testThis block lets you create (draft) Etsy listings directly from Airtable'), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      textColor: "green",
      padding: 2
    }, 'You have a connected Etsy account', /*#__PURE__*/_react.default.createElement(_ui.Icon, {
      name: "check",
      size: 16
    })), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      fontWeight: "bold",
      padding: 2
    }, 'Select a record to see a preview'), /*#__PURE__*/_react.default.createElement(_ui.Box, {
      backgroundColor: "lightGray3",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 2
    }, /*#__PURE__*/_react.default.createElement(_ui.Text, {
      padding: 2
    }, 'You will need your table to have the following columns in your table'), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      fontWeight: "bold",
      padding: 2
    }, 'Title, Description, Price, Quantity')));
  } else {
    // Record selected - show the block
    content = /*#__PURE__*/_react.default.createElement(ListingPreview, {
      table: table,
      selectedRecordId: selectedRecordId
    });
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, content);
} // Component to handle connecting an Etsy account


function AuthBlock() {
  /* These are all public-facing anyway - they come from the loginURl etc. */
  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      loginLink = _useState4[0],
      setLoginLink = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      oauthToken = _useState6[0],
      setOauthToken = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      oauthTokenSecret = _useState8[0],
      setOauthTokenSecret = _useState8[1];

  var _useState9 = (0, _react.useState)(""),
      _useState10 = _slicedToArray(_useState9, 2),
      verifierValue = _useState10[0],
      setVerifierValue = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      verifyingKey = _useState12[0],
      setVerifyingKey = _useState12[1];

  (0, _react.useEffect)(function () {
    function getTempCredentials() {
      return _getTempCredentials.apply(this, arguments);
    }

    function _getTempCredentials() {
      _getTempCredentials = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var oauth, requestData, response, loginLink, decoded, tempCredentialsURL, params, token, tokenSecret;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                oauth = new _oauth.default({
                  consumer: {
                    key: _config.etsyApiKey,
                    secret: _config.etsySharedSecret
                  }
                });
                requestData = {
                  //url: 'https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/oauth/request_token?scope=listings_w%20listings_r',
                  url: 'https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v3/public/oauth/token?scope=transactions_r%20transactions_r',
                  method: 'POST'
                };
                _context.next = 4;
                return fetch(requestData.url, {
                  method: 'POST',
                  mode: 'cors',
                  cache: 'no-cache',
                  headers: _objectSpread({
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }, oauth.toHeader(oauth.authorize(requestData)))
                });

              case 4:
                response = _context.sent;
                _context.next = 7;
                return response.text();

              case 7:
                loginLink = _context.sent;

                /* remove login_url from the start of the response */
                decoded = decodeURIComponent(loginLink);
                tempCredentialsURL = decoded.split('=');
                tempCredentialsURL.shift();
                tempCredentialsURL = tempCredentialsURL.join('=');
                params = new URLSearchParams(tempCredentialsURL);
                token = params.get("oauth_token");
                tokenSecret = params.get("oauth_token_secret");
                setLoginLink(tempCredentialsURL);
                setOauthToken(token);
                setOauthTokenSecret(tokenSecret);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getTempCredentials.apply(this, arguments);
    }

    getTempCredentials();
  }, []);

  function submitVerifier() {
    return _submitVerifier.apply(this, arguments);
  }

  function _submitVerifier() {
    _submitVerifier = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var oauth, requestData, token, response, permanentCredentials, params, permToken, permTokenSecret, userDataResponse, userDetails, userID, shippingProfileResponse, shippingProfiles, shippingProfileID;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setVerifyingKey(true);
              oauth = new _oauth.default({
                consumer: {
                  key: _config.etsyApiKey,
                  secret: _config.etsySharedSecret
                }
              });
              requestData = {
                //url:    'https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/oauth/access_token',
                url: 'https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v3/public/oauth/token',
                method: 'POST',
                data: {
                  oauth_verifier: verifierValue
                }
              };
              token = {
                key: oauthToken,
                secret: oauthTokenSecret
              };
              _context2.next = 6;
              return fetch(requestData.url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: _objectSpread({
                  'Content-Type': 'application/x-www-form-urlencoded'
                }, oauth.toHeader(oauth.authorize(requestData, token)))
              });

            case 6:
              response = _context2.sent;
              _context2.next = 9;
              return response.text();

            case 9:
              permanentCredentials = _context2.sent;
              params = new URLSearchParams(permanentCredentials);
              permToken = params.get("oauth_token");
              permTokenSecret = params.get("oauth_token_secret");
              /* Get user_id - needed for accessing shipping template */

              requestData = {
                //url: 'https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/users/__SELF__',
                url: 'https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v3/application/users/__SELF__',
                method: 'GET'
              };
              token = {
                key: permToken,
                secret: permTokenSecret
              };
              _context2.next = 17;
              return fetch(requestData.url, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: _objectSpread({
                  'Content-Type': 'application/x-www-form-urlencoded'
                }, oauth.toHeader(oauth.authorize(requestData, token)))
              });

            case 17:
              userDataResponse = _context2.sent;
              _context2.next = 20;
              return userDataResponse.json();

            case 20:
              userDetails = _context2.sent;
              userID = userDetails.results[0].user_id;
              /* Get shipping template - needed for a createListing call to the Etsy API*/

              requestData = {
                //url:    `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/users/${userID}/shipping/templates`,
                url: "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/application/shops/15911509/shipping-profiles",
                method: 'GET'
              };
              _context2.next = 25;
              return fetch(requestData.url, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: _objectSpread({
                  'Content-Type': 'application/x-www-form-urlencoded'
                }, oauth.toHeader(oauth.authorize(requestData, token)))
              });

            case 25:
              shippingProfileResponse = _context2.sent;
              _context2.next = 28;
              return shippingProfileResponse.json();

            case 28:
              shippingProfiles = _context2.sent;
              shippingProfileID = shippingProfiles.results[0].shipping_profile_id; // Add shipping template ID to use for the createListing calls later

              if (!_blocks.globalConfig.hasPermissionToSet('shippingProfileID', shippingProfileID)) {
                _context2.next = 33;
                break;
              }

              _context2.next = 33;
              return _blocks.globalConfig.setAsync('shippingProfileID', shippingProfileID);

            case 33:
              if (!_blocks.globalConfig.hasPermissionToSet('etsyOathToken', permToken)) {
                _context2.next = 36;
                break;
              }

              _context2.next = 36;
              return _blocks.globalConfig.setAsync('etsyOathToken', permToken);

            case 36:
              if (!_blocks.globalConfig.hasPermissionToSet('etsyOathSecret', permTokenSecret)) {
                _context2.next = 39;
                break;
              }

              _context2.next = 39;
              return _blocks.globalConfig.setAsync('etsyOathSecret', permTokenSecret);

            case 39:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _submitVerifier.apply(this, arguments);
  }

  var content = /*#__PURE__*/_react.default.createElement(_ui.Text, {
    padding: 2
  }, "\"Something has gone wrong with authentication - please refresh your block\"");

  if (!(_blocks.globalConfig.get('etsyOathToken') && _blocks.globalConfig.get('etsyOathSecret'))) {
    content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Text, {
      fontSize: 32,
      padding: 2
    }, 'Etsy for Airtable'), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      fontStyle: "italic",
      padding: 2
    }, 'TESTThis block lets you create (draft) Etsy listings directly from Airtable'), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      textColor: "red",
      padding: 2
    }, 'You are not currently connected to an Etsy Account', /*#__PURE__*/_react.default.createElement(_ui.Icon, {
      name: "x",
      size: 16
    })), /*#__PURE__*/_react.default.createElement(_ui.Box, {
      backgroundColor: "lightGray3",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 2
    }, /*#__PURE__*/_react.default.createElement(_ui.Text, {
      padding: 2
    }, 'You will need your table to have the following columns in your table'), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      fontWeight: "bold",
      padding: 2
    }, 'Title, Description, Price, Quantity')), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      fontStyle: "italic",
      textColor: "orange",
      padding: 4
    }, /*#__PURE__*/_react.default.createElement(_ui.Icon, {
      name: "upload",
      size: 16,
      paddingRight: 2
    }), 'Connecting to the Etsy API to begin a login - please wait, this may take a few minutes but you will only need to do this once :)'));
  }

  if (loginLink) {
    content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Text, {
      fontStyle: "italic",
      padding: 2
    }, 'Click below to connect your account to the Etsy API and get a verification key'), /*#__PURE__*/_react.default.createElement(_ui.Link, {
      href: loginLink,
      target: "_blank",
      icon: "hyperlink",
      padding: 2
    }, 'Connect your Etsy Account'), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      padding: 2
    }, 'Enter the verification key below'), /*#__PURE__*/_react.default.createElement(_ui.Input, {
      value: verifierValue,
      onChange: function onChange(e) {
        return setVerifierValue(e.target.value);
      },
      width: "200px",
      margin: 2
    }), /*#__PURE__*/_react.default.createElement(_ui.Button, {
      onClick: submitVerifier,
      margin: 2
    }, 'Submit verification key'));
  }

  if (verifyingKey) {
    content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ui.Text, {
      textColor: "orange",
      padding: 2
    }, 'Verifying your key - please wait'), /*#__PURE__*/_react.default.createElement(_ui.Text, null, "This may take a few minutes"));
  }

  return /*#__PURE__*/_react.default.createElement(_ui.Box, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 4
  }, content);
} // Show a preview of the etsy listing and a button to create it


function ListingPreview(_ref) {
  var table = _ref.table,
      selectedRecordId = _ref.selectedRecordId;

  var _useState13 = (0, _react.useState)(null),
      _useState14 = _slicedToArray(_useState13, 2),
      creationState = _useState14[0],
      setCreationState = _useState14[1];

  function sendDraftListing(_x, _x2, _x3, _x4, _x5) {
    return _sendDraftListing.apply(this, arguments);
  } // Re-render if the record changes


  function _sendDraftListing() {
    _sendDraftListing = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(listingTitle, listingDescription, listingPrice, listingQuantity, shippingTemplate) {
      var oauth, requestData, listingData, token, response, responseData;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              setCreationState('Creating your listing in Etsy');
              oauth = new _oauth.default({
                consumer: {
                  key: _config.etsyApiKey,
                  secret: _config.etsySharedSecret
                }
              });
              requestData = {
                //url: 'https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings',
                url: 'https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v3/application/shops/15911509/listings',
                method: 'POST'
              };
              listingData = {
                quantity: listingQuantity,
                title: listingTitle,
                description: listingDescription,
                price: listingPrice,
                shipping_template_id: shippingTemplate,
                taxonomy_id: 1,
                state: 'draft',
                who_made: 'i_did',
                is_supply: false,
                when_made: 'made_to_order'
              };
              token = {
                key: _blocks.globalConfig.get('etsyOathToken'),
                secret: _blocks.globalConfig.get('etsyOathSecret')
              };
              _context4.next = 7;
              return fetch(requestData.url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: _objectSpread({
                  'Content-Type': 'application/json'
                }, oauth.toHeader(oauth.authorize(requestData, token))),
                body: JSON.stringify(listingData)
              });

            case 7:
              response = _context4.sent;
              _context4.next = 10;
              return response.text();

            case 10:
              responseData = _context4.sent;
              setCreationState("Made in Etsy, head over to your account to check out the draft");

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _sendDraftListing.apply(this, arguments);
  }

  var selectedRecord = (0, _ui.useRecordById)(table, selectedRecordId ? selectedRecordId : '');
  (0, _react.useEffect)(function () {
    // Reset creation state if record changes
    function resetCreationState() {
      return _resetCreationState.apply(this, arguments);
    }

    function _resetCreationState() {
      _resetCreationState = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                setCreationState("");

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return _resetCreationState.apply(this, arguments);
    }

    resetCreationState();
  }, [selectedRecordId]);
  var title = selectedRecord.getCellValue('Title');
  var description = selectedRecord.getCellValue('Description');
  var price = selectedRecord.getCellValue('Price');
  var quantity = selectedRecord.getCellValue('Quantity');

  var shippingTemplateID = _blocks.globalConfig.get('shippingTemplateID');

  if (!title || !description || !price || !quantity) {
    // Need to have all fields filled in to send the API request
    return /*#__PURE__*/_react.default.createElement(_ui.Box, {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4
    }, /*#__PURE__*/_react.default.createElement(_ui.Text, {
      padding: 2
    }, "Please fill in all the required fields"), ";");
  } else {
    return /*#__PURE__*/_react.default.createElement(_ui.Box, {
      display: "flex",
      flexDirection: "column",
      padding: 4
    }, /*#__PURE__*/_react.default.createElement(_ui.Text, {
      padding: 2
    }, /*#__PURE__*/_react.default.createElement("b", null, "Title"), " : ", title), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      padding: 2
    }, /*#__PURE__*/_react.default.createElement("b", null, "Description"), " : ", description), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      padding: 2
    }, /*#__PURE__*/_react.default.createElement("b", null, "Price"), " : ", price), /*#__PURE__*/_react.default.createElement(_ui.Text, {
      padding: 2
    }, /*#__PURE__*/_react.default.createElement("b", null, "Quantity"), " : ", quantity), /*#__PURE__*/_react.default.createElement(_ui.Button, {
      margin: 2,
      onClick: function onClick() {
        return sendDraftListing(title, description, price, quantity, shippingTemplateID);
      }
    }, 'Make (Draft) Etsy Listing'), creationState && /*#__PURE__*/_react.default.createElement(_ui.Text, {
      textColor: "orange",
      padding: 2
    }, creationState));
  }
}

(0, _ui.initializeBlock)(function () {
  return /*#__PURE__*/_react.default.createElement(EtsyListingBlock, null);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkV0c3lMaXN0aW5nQmxvY2siLCJzZWxlY3RlZFJlY29yZElkIiwic2V0U2VsZWN0ZWRSZWNvcmRJZCIsImdsb2JhbENvbmZpZyIsImN1cnNvciIsInNlbGVjdGVkUmVjb3JkSWRzIiwibGVuZ3RoIiwiYmFzZSIsInRhYmxlIiwiZ2V0VGFibGUiLCJjb250ZW50IiwiZ2V0IiwiYWN0aXZlVGFibGVJZCIsImlkIiwiQXV0aEJsb2NrIiwibG9naW5MaW5rIiwic2V0TG9naW5MaW5rIiwib2F1dGhUb2tlbiIsInNldE9hdXRoVG9rZW4iLCJvYXV0aFRva2VuU2VjcmV0Iiwic2V0T2F1dGhUb2tlblNlY3JldCIsInZlcmlmaWVyVmFsdWUiLCJzZXRWZXJpZmllclZhbHVlIiwidmVyaWZ5aW5nS2V5Iiwic2V0VmVyaWZ5aW5nS2V5IiwiZ2V0VGVtcENyZWRlbnRpYWxzIiwib2F1dGgiLCJPQXV0aCIsImNvbnN1bWVyIiwia2V5IiwiZXRzeUFwaUtleSIsInNlY3JldCIsImV0c3lTaGFyZWRTZWNyZXQiLCJyZXF1ZXN0RGF0YSIsInVybCIsIm1ldGhvZCIsImZldGNoIiwibW9kZSIsImNhY2hlIiwiaGVhZGVycyIsInRvSGVhZGVyIiwiYXV0aG9yaXplIiwicmVzcG9uc2UiLCJ0ZXh0IiwiZGVjb2RlZCIsImRlY29kZVVSSUNvbXBvbmVudCIsInRlbXBDcmVkZW50aWFsc1VSTCIsInNwbGl0Iiwic2hpZnQiLCJqb2luIiwicGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwidG9rZW4iLCJ0b2tlblNlY3JldCIsInN1Ym1pdFZlcmlmaWVyIiwiZGF0YSIsIm9hdXRoX3ZlcmlmaWVyIiwicGVybWFuZW50Q3JlZGVudGlhbHMiLCJwZXJtVG9rZW4iLCJwZXJtVG9rZW5TZWNyZXQiLCJ1c2VyRGF0YVJlc3BvbnNlIiwianNvbiIsInVzZXJEZXRhaWxzIiwidXNlcklEIiwicmVzdWx0cyIsInVzZXJfaWQiLCJzaGlwcGluZ1Byb2ZpbGVSZXNwb25zZSIsInNoaXBwaW5nUHJvZmlsZXMiLCJzaGlwcGluZ1Byb2ZpbGVJRCIsInNoaXBwaW5nX3Byb2ZpbGVfaWQiLCJoYXNQZXJtaXNzaW9uVG9TZXQiLCJzZXRBc3luYyIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsIkxpc3RpbmdQcmV2aWV3IiwiY3JlYXRpb25TdGF0ZSIsInNldENyZWF0aW9uU3RhdGUiLCJzZW5kRHJhZnRMaXN0aW5nIiwibGlzdGluZ1RpdGxlIiwibGlzdGluZ0Rlc2NyaXB0aW9uIiwibGlzdGluZ1ByaWNlIiwibGlzdGluZ1F1YW50aXR5Iiwic2hpcHBpbmdUZW1wbGF0ZSIsImxpc3RpbmdEYXRhIiwicXVhbnRpdHkiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicHJpY2UiLCJzaGlwcGluZ190ZW1wbGF0ZV9pZCIsInRheG9ub215X2lkIiwic3RhdGUiLCJ3aG9fbWFkZSIsImlzX3N1cHBseSIsIndoZW5fbWFkZSIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2VEYXRhIiwic2VsZWN0ZWRSZWNvcmQiLCJyZXNldENyZWF0aW9uU3RhdGUiLCJnZXRDZWxsVmFsdWUiLCJzaGlwcGluZ1RlbXBsYXRlSUQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFJQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxTQUFTQSxnQkFBVCxHQUE0QjtBQUMxQixrQkFBZ0QscUJBQVMsSUFBVCxDQUFoRDtBQUFBO0FBQUEsTUFBT0MsZ0JBQVA7QUFBQSxNQUF5QkMsbUJBQXpCOztBQUNBLE1BQU1DLFlBQVksR0FBRywwQkFBckI7QUFFQSx1QkFBWUMsY0FBWixFQUowQixDQU0xQjs7QUFDQSx3QkFBYUEsY0FBYixFQUFxQixDQUFDLG1CQUFELENBQXJCLEVBQTRDLFlBQU07QUFDaEQsUUFBSUEsZUFBT0MsaUJBQVAsQ0FBeUJDLE1BQXpCLEdBQWtDLENBQXRDLEVBQXlDO0FBQ3ZDSixNQUFBQSxtQkFBbUIsQ0FBQ0UsZUFB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LGFBQWEsaUJBQUksNkJBQUMsUUFBRDtBQUFNLE1BQUEsU0FBUyxFQUFDLFFBQWhCO0FBQXlCLE1BQUEsT0FBTyxFQUFFO0FBQWxDLE9BQXNDQSxhQUF0QyxDQU5aLENBQVI7QUFRRDtBQUNGOztBQUVELHlCQUFnQjtBQUFBLHNCQUFNLDZCQUFDLGdCQUFELE9BQU47QUFBQSxDQUFoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IE9BdXRoIGZyb20gJ29hdXRoLTEuMGEnO1xuXG5pbXBvcnQge1xuICBpbml0aWFsaXplQmxvY2ssIHVzZUJhc2UsIHVzZVJlY29yZEJ5SWQsIHVzZUxvYWRhYmxlLCB1c2VXYXRjaGFibGUsIHVzZUdsb2JhbENvbmZpZyxcbiAgQm94LCBUZXh0LCBCdXR0b24sIExpbmssIElucHV0LCBJY29uXG59IGZyb20gJ0BhaXJ0YWJsZS9ibG9ja3MvdWknO1xuaW1wb3J0IHtjdXJzb3IsIGdsb2JhbENvbmZpZyB9IGZyb20gJ0BhaXJ0YWJsZS9ibG9ja3MnO1xuXG5pbXBvcnQgeyBldHN5QXBpS2V5LCBldHN5U2hhcmVkU2VjcmV0IH0gZnJvbSAnLi4vY29uZmlnJztcblxuLy8gRW50cnkgcG9pbnQgLSBtYWluIGJsb2NrXG5mdW5jdGlvbiBFdHN5TGlzdGluZ0Jsb2NrKCkge1xuICBjb25zdCBbc2VsZWN0ZWRSZWNvcmRJZCwgc2V0U2VsZWN0ZWRSZWNvcmRJZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgZ2xvYmFsQ29uZmlnID0gdXNlR2xvYmFsQ29uZmlnKCk7XG5cbiAgdXNlTG9hZGFibGUoY3Vyc29yKTtcblxuICAvLyBJZiBtdWx0aXBsZSByZWNvcmRzIHNlbGVjdGVkIHVzZSB0aGUgZmlyc3Qgb25lXG4gIHVzZVdhdGNoYWJsZShjdXJzb3IsIFsnc2VsZWN0ZWRSZWNvcmRJZHMnXSwgKCkgPT4ge1xuICAgIGlmIChjdXJzb3Iuc2VsZWN0ZWRSZWNvcmRJZHMubGVuZ3RoID4gMCkge1xuICAgICAgc2V0U2VsZWN0ZWRSZWNvcmRJZChjdXJzb3Iuc2VsZWN0ZWRSZWNvcmRJZHNbMF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgYmFzZSA9IHVzZUJhc2UoKTtcbiAgY29uc3QgdGFibGUgPSBiYXNlLmdldFRhYmxlKCdFdHN5IExpc3RpbmdzJyk7XG5cbiAgbGV0IGNvbnRlbnQ7XG5cbiAgaWYgKCEoZ2xvYmFsQ29uZmlnLmdldCgnZXRzeU9hdGhUb2tlbicpICYmIGdsb2JhbENvbmZpZy5nZXQoJ2V0c3lPYXRoU2VjcmV0JykpKSB7IC8vIElmIHRoZXJlJ3Mgbm8gbGlua2VkIEV0c3kgQWNjb3VudFxuICAgIGNvbnRlbnQgPSA8QXV0aEJsb2NrIC8+XG4gIH1cbiAgZWxzZSBpZihjdXJzb3IuYWN0aXZlVGFibGVJZCAhPT0gdGFibGUuaWQgfHwgIXNlbGVjdGVkUmVjb3JkSWQpIHsgLy8gSWYgbm8gcmVjb3JkIHNlbGVjdGVkXG4gICAgY29udGVudCA9IChcbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIHBhZGRpbmc9ezR9PlxuICAgICAgICA8VGV4dCBmb250U2l6ZT17MzJ9IHBhZGRpbmc9ezJ9PnsnRXRzeSBmb3IgQWlydGFibGUnfTwvVGV4dD5cbiAgICAgICAgPFRleHQgZm9udFN0eWxlPVwiaXRhbGljXCIgcGFkZGluZz17Mn0+eyd0ZXN0VGhpcyBibG9jayBsZXRzIHlvdSBjcmVhdGUgKGRyYWZ0KSBFdHN5IGxpc3RpbmdzIGRpcmVjdGx5IGZyb20gQWlydGFibGUnfTwvVGV4dD5cbiAgICAgICAgPFRleHQgdGV4dENvbG9yPVwiZ3JlZW5cIiBwYWRkaW5nPXsyfT57J1lvdSBoYXZlIGEgY29ubmVjdGVkIEV0c3kgYWNjb3VudCd9PEljb24gbmFtZT1cImNoZWNrXCIgc2l6ZT17MTZ9IC8+PC9UZXh0PlxuICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIHBhZGRpbmc9ezJ9PnsnU2VsZWN0IGEgcmVjb3JkIHRvIHNlZSBhIHByZXZpZXcnfTwvVGV4dD5cbiAgICAgICAgPEJveCBiYWNrZ3JvdW5kQ29sb3I9XCJsaWdodEdyYXkzXCIgZGlzcGxheT1cImZsZXhcIiBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIHBhZGRpbmc9ezJ9PlxuICAgICAgICAgIDxUZXh0IHBhZGRpbmc9ezJ9PnsnWW91IHdpbGwgbmVlZCB5b3VyIHRhYmxlIHRvIGhhdmUgdGhlIGZvbGxvd2luZyBjb2x1bW5zIGluIHlvdXIgdGFibGUnfTwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIHBhZGRpbmc9ezJ9PnsnVGl0bGUsIERlc2NyaXB0aW9uLCBQcmljZSwgUXVhbnRpdHknfTwvVGV4dD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9IGVsc2UgeyAvLyBSZWNvcmQgc2VsZWN0ZWQgLSBzaG93IHRoZSBibG9ja1xuICAgIGNvbnRlbnQgPSA8TGlzdGluZ1ByZXZpZXcgdGFibGU9e3RhYmxlfSBzZWxlY3RlZFJlY29yZElkPXtzZWxlY3RlZFJlY29yZElkfSAvPjtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD57Y29udGVudH08Lz5cbiAgKTtcbn1cblxuLy8gQ29tcG9uZW50IHRvIGhhbmRsZSBjb25uZWN0aW5nIGFuIEV0c3kgYWNjb3VudFxuZnVuY3Rpb24gQXV0aEJsb2NrKCkge1xuICAvKiBUaGVzZSBhcmUgYWxsIHB1YmxpYy1mYWNpbmcgYW55d2F5IC0gdGhleSBjb21lIGZyb20gdGhlIGxvZ2luVVJsIGV0Yy4gKi9cbiAgY29uc3QgW2xvZ2luTGluaywgc2V0TG9naW5MaW5rXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbb2F1dGhUb2tlbiwgc2V0T2F1dGhUb2tlbl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW29hdXRoVG9rZW5TZWNyZXQsIHNldE9hdXRoVG9rZW5TZWNyZXRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt2ZXJpZmllclZhbHVlLCBzZXRWZXJpZmllclZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbdmVyaWZ5aW5nS2V5LCBzZXRWZXJpZnlpbmdLZXldID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRUZW1wQ3JlZGVudGlhbHMoKSB7XG5cbiAgICAgIHZhciBvYXV0aCA9IG5ldyBPQXV0aCh7XG4gICAgICAgIGNvbnN1bWVyOiB7XG4gICAgICAgICAga2V5OiBldHN5QXBpS2V5LFxuICAgICAgICAgIHNlY3JldDogZXRzeVNoYXJlZFNlY3JldCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgcmVxdWVzdERhdGEgPSB7XG4gICAgICAgIC8vdXJsOiAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9vcGVuYXBpLmV0c3kuY29tL3YyL29hdXRoL3JlcXVlc3RfdG9rZW4/c2NvcGU9bGlzdGluZ3NfdyUyMGxpc3RpbmdzX3InLFxuICAgICAgICB1cmw6ICdodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS9odHRwczovL29wZW5hcGkuZXRzeS5jb20vdjMvcHVibGljL29hdXRoL3Rva2VuP3Njb3BlPXRyYW5zYWN0aW9uc19yJTIwdHJhbnNhY3Rpb25zX3InLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0RGF0YS51cmwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgY2FjaGU6ICduby1jYWNoZScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICAgLi4ub2F1dGgudG9IZWFkZXIob2F1dGguYXV0aG9yaXplKHJlcXVlc3REYXRhKSksXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGxvZ2luTGluayA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcblxuICAgICAgLyogcmVtb3ZlIGxvZ2luX3VybCBmcm9tIHRoZSBzdGFydCBvZiB0aGUgcmVzcG9uc2UgKi9cbiAgICAgIGNvbnN0IGRlY29kZWQgPSBkZWNvZGVVUklDb21wb25lbnQobG9naW5MaW5rKTtcbiAgICAgIGxldCB0ZW1wQ3JlZGVudGlhbHNVUkwgPSBkZWNvZGVkLnNwbGl0KCc9Jyk7XG4gICAgICB0ZW1wQ3JlZGVudGlhbHNVUkwuc2hpZnQoKTtcbiAgICAgIHRlbXBDcmVkZW50aWFsc1VSTCA9IHRlbXBDcmVkZW50aWFsc1VSTC5qb2luKCc9Jyk7XG5cbiAgICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHRlbXBDcmVkZW50aWFsc1VSTCk7XG4gICAgICBsZXQgdG9rZW4gPSBwYXJhbXMuZ2V0KFwib2F1dGhfdG9rZW5cIik7XG4gICAgICBsZXQgdG9rZW5TZWNyZXQgPSBwYXJhbXMuZ2V0KFwib2F1dGhfdG9rZW5fc2VjcmV0XCIpO1xuXG4gICAgICBzZXRMb2dpbkxpbmsodGVtcENyZWRlbnRpYWxzVVJMKTtcbiAgICAgIHNldE9hdXRoVG9rZW4odG9rZW4pO1xuICAgICAgc2V0T2F1dGhUb2tlblNlY3JldCh0b2tlblNlY3JldCk7XG4gICAgfVxuXG4gICAgZ2V0VGVtcENyZWRlbnRpYWxzKCk7XG4gIH0sIFtdKTtcblxuICBhc3luYyBmdW5jdGlvbiBzdWJtaXRWZXJpZmllcigpIHtcbiAgICBzZXRWZXJpZnlpbmdLZXkodHJ1ZSk7XG5cbiAgICB2YXIgb2F1dGggPSBuZXcgT0F1dGgoe1xuICAgICAgY29uc3VtZXI6IHtcbiAgICAgICAga2V5OiBldHN5QXBpS2V5LFxuICAgICAgICBzZWNyZXQ6IGV0c3lTaGFyZWRTZWNyZXQsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgbGV0IHJlcXVlc3REYXRhID0ge1xuICAgICAgLy91cmw6ICAgICdodHRwczovL2NvcnMtYW55d2hlcmUuaGVyb2t1YXBwLmNvbS9odHRwczovL29wZW5hcGkuZXRzeS5jb20vdjIvb2F1dGgvYWNjZXNzX3Rva2VuJyxcbiAgICAgIHVybDogICAgJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vb3BlbmFwaS5ldHN5LmNvbS92My9wdWJsaWMvb2F1dGgvdG9rZW4nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG9hdXRoX3ZlcmlmaWVyOiB2ZXJpZmllclZhbHVlXG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCB0b2tlbiA9IHtcbiAgICAgIGtleTogb2F1dGhUb2tlbixcbiAgICAgIHNlY3JldDogb2F1dGhUb2tlblNlY3JldFxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdERhdGEudXJsLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgIGNhY2hlOiAnbm8tY2FjaGUnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgIC4uLm9hdXRoLnRvSGVhZGVyKG9hdXRoLmF1dGhvcml6ZShyZXF1ZXN0RGF0YSwgdG9rZW4pKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgY29uc3QgcGVybWFuZW50Q3JlZGVudGlhbHMgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG5cbiAgICBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwZXJtYW5lbnRDcmVkZW50aWFscyk7XG4gICAgbGV0IHBlcm1Ub2tlbiA9IHBhcmFtcy5nZXQoXCJvYXV0aF90b2tlblwiKTtcbiAgICBsZXQgcGVybVRva2VuU2VjcmV0ID0gcGFyYW1zLmdldChcIm9hdXRoX3Rva2VuX3NlY3JldFwiKTtcblxuICAgIC8qIEdldCB1c2VyX2lkIC0gbmVlZGVkIGZvciBhY2Nlc3Npbmcgc2hpcHBpbmcgdGVtcGxhdGUgKi9cbiAgICByZXF1ZXN0RGF0YSA9IHtcbiAgICAgIC8vdXJsOiAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9vcGVuYXBpLmV0c3kuY29tL3YyL3VzZXJzL19fU0VMRl9fJyxcbiAgICAgIHVybDogJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vb3BlbmFwaS5ldHN5LmNvbS92My9hcHBsaWNhdGlvbi91c2Vycy9fX1NFTEZfXycsXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfTtcblxuICAgIHRva2VuID0ge1xuICAgICAgICBrZXk6IHBlcm1Ub2tlbixcbiAgICAgICAgc2VjcmV0OiBwZXJtVG9rZW5TZWNyZXQsXG4gICAgfVxuXG4gICAgY29uc3QgdXNlckRhdGFSZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3REYXRhLnVybCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgIGNhY2hlOiAnbm8tY2FjaGUnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgIC4uLm9hdXRoLnRvSGVhZGVyKG9hdXRoLmF1dGhvcml6ZShyZXF1ZXN0RGF0YSwgdG9rZW4pKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgY29uc3QgdXNlckRldGFpbHMgPSBhd2FpdCB1c2VyRGF0YVJlc3BvbnNlLmpzb24oKTtcbiAgICBsZXQgdXNlcklEID0gdXNlckRldGFpbHMucmVzdWx0c1swXS51c2VyX2lkO1xuICAgIC8qIEdldCBzaGlwcGluZyB0ZW1wbGF0ZSAtIG5lZWRlZCBmb3IgYSBjcmVhdGVMaXN0aW5nIGNhbGwgdG8gdGhlIEV0c3kgQVBJKi9cbiAgICByZXF1ZXN0RGF0YSA9IHtcbiAgICAgIC8vdXJsOiAgICBgaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9vcGVuYXBpLmV0c3kuY29tL3YyL3VzZXJzLyR7dXNlcklEfS9zaGlwcGluZy90ZW1wbGF0ZXNgLFxuICAgICAgdXJsOiAgICBgaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9vcGVuYXBpLmV0c3kuY29tL2FwcGxpY2F0aW9uL3Nob3BzLzE1OTExNTA5L3NoaXBwaW5nLXByb2ZpbGVzYCxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfTtcblxuICAgIGNvbnN0IHNoaXBwaW5nUHJvZmlsZVJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdERhdGEudXJsLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgY2FjaGU6ICduby1jYWNoZScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgICAgLi4ub2F1dGgudG9IZWFkZXIob2F1dGguYXV0aG9yaXplKHJlcXVlc3REYXRhLCB0b2tlbikpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBjb25zdCBzaGlwcGluZ1Byb2ZpbGVzID0gYXdhaXQgc2hpcHBpbmdQcm9maWxlUmVzcG9uc2UuanNvbigpO1xuICAgIGxldCBzaGlwcGluZ1Byb2ZpbGVJRCA9IHNoaXBwaW5nUHJvZmlsZXMucmVzdWx0c1swXS5zaGlwcGluZ19wcm9maWxlX2lkO1xuXG4gICAgLy8gQWRkIHNoaXBwaW5nIHRlbXBsYXRlIElEIHRvIHVzZSBmb3IgdGhlIGNyZWF0ZUxpc3RpbmcgY2FsbHMgbGF0ZXJcbiAgICBpZiAoZ2xvYmFsQ29uZmlnLmhhc1Blcm1pc3Npb25Ub1NldCgnc2hpcHBpbmdQcm9maWxlSUQnLCBzaGlwcGluZ1Byb2ZpbGVJRCkpIHtcbiAgICAgIGF3YWl0IGdsb2JhbENvbmZpZy5zZXRBc3luYygnc2hpcHBpbmdQcm9maWxlSUQnLCBzaGlwcGluZ1Byb2ZpbGVJRCk7XG4gICAgfVxuXG4gICAgLyogU2V0IHRoZSBwZXJtYW5lbnQgY3JlZGVudGlhbHMgaW50byB0aGUgZ2xvYmFsIGNvbmZpZyAqL1xuICAgIGlmIChnbG9iYWxDb25maWcuaGFzUGVybWlzc2lvblRvU2V0KCdldHN5T2F0aFRva2VuJywgcGVybVRva2VuKSkge1xuICAgICAgYXdhaXQgZ2xvYmFsQ29uZmlnLnNldEFzeW5jKCdldHN5T2F0aFRva2VuJywgcGVybVRva2VuKTtcbiAgICB9XG4gICAgaWYgKGdsb2JhbENvbmZpZy5oYXNQZXJtaXNzaW9uVG9TZXQoJ2V0c3lPYXRoU2VjcmV0JywgcGVybVRva2VuU2VjcmV0KSkge1xuICAgICAgYXdhaXQgZ2xvYmFsQ29uZmlnLnNldEFzeW5jKCdldHN5T2F0aFNlY3JldCcsIHBlcm1Ub2tlblNlY3JldCk7XG4gICAgfVxuICB9XG5cbiAgbGV0IGNvbnRlbnQgPSA8VGV4dCBwYWRkaW5nPXsyfT5cIlNvbWV0aGluZyBoYXMgZ29uZSB3cm9uZyB3aXRoIGF1dGhlbnRpY2F0aW9uIC0gcGxlYXNlIHJlZnJlc2ggeW91ciBibG9ja1wiPC9UZXh0PjtcblxuICBpZiAoIShnbG9iYWxDb25maWcuZ2V0KCdldHN5T2F0aFRva2VuJykgJiYgZ2xvYmFsQ29uZmlnLmdldCgnZXRzeU9hdGhTZWNyZXQnKSkpIHtcblxuICAgIGNvbnRlbnQgPSAoPD5cbiAgICAgIDxUZXh0IGZvbnRTaXplPXszMn0gcGFkZGluZz17Mn0+eydFdHN5IGZvciBBaXJ0YWJsZSd9PC9UZXh0PlxuICAgICAgPFRleHQgZm9udFN0eWxlPVwiaXRhbGljXCIgcGFkZGluZz17Mn0+eydURVNUVGhpcyBibG9jayBsZXRzIHlvdSBjcmVhdGUgKGRyYWZ0KSBFdHN5IGxpc3RpbmdzIGRpcmVjdGx5IGZyb20gQWlydGFibGUnfTwvVGV4dD5cbiAgICAgIDxUZXh0IHRleHRDb2xvcj1cInJlZFwiIHBhZGRpbmc9ezJ9PnsnWW91IGFyZSBub3QgY3VycmVudGx5IGNvbm5lY3RlZCB0byBhbiBFdHN5IEFjY291bnQnfTxJY29uIG5hbWU9XCJ4XCIgc2l6ZT17MTZ9IC8+PC9UZXh0PlxuICAgICAgPEJveCBiYWNrZ3JvdW5kQ29sb3I9XCJsaWdodEdyYXkzXCIgZGlzcGxheT1cImZsZXhcIiBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIHBhZGRpbmc9ezJ9PlxuICAgICAgICA8VGV4dCBwYWRkaW5nPXsyfT57J1lvdSB3aWxsIG5lZWQgeW91ciB0YWJsZSB0byBoYXZlIHRoZSBmb2xsb3dpbmcgY29sdW1ucyBpbiB5b3VyIHRhYmxlJ308L1RleHQ+XG4gICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCIgcGFkZGluZz17Mn0+eydUaXRsZSwgRGVzY3JpcHRpb24sIFByaWNlLCBRdWFudGl0eSd9PC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgICA8VGV4dCBmb250U3R5bGU9XCJpdGFsaWNcIiB0ZXh0Q29sb3I9XCJvcmFuZ2VcIiBwYWRkaW5nPXs0fT48SWNvbiBuYW1lPVwidXBsb2FkXCIgc2l6ZT17MTZ9IHBhZGRpbmdSaWdodD17Mn0vPnsnQ29ubmVjdGluZyB0byB0aGUgRXRzeSBBUEkgdG8gYmVnaW4gYSBsb2dpbiAtIHBsZWFzZSB3YWl0LCB0aGlzIG1heSB0YWtlIGEgZmV3IG1pbnV0ZXMgYnV0IHlvdSB3aWxsIG9ubHkgbmVlZCB0byBkbyB0aGlzIG9uY2UgOiknfTwvVGV4dD5cbiAgICA8Lz4pO1xuICB9XG5cbiAgaWYgKGxvZ2luTGluayl7XG4gICAgY29udGVudCA9ICg8PlxuICAgICAgPFRleHQgZm9udFN0eWxlPVwiaXRhbGljXCIgcGFkZGluZz17Mn0+eydDbGljayBiZWxvdyB0byBjb25uZWN0IHlvdXIgYWNjb3VudCB0byB0aGUgRXRzeSBBUEkgYW5kIGdldCBhIHZlcmlmaWNhdGlvbiBrZXknfTwvVGV4dD5cbiAgICAgIDxMaW5rIGhyZWY9e2xvZ2luTGlua30gdGFyZ2V0PVwiX2JsYW5rXCIgaWNvbj1cImh5cGVybGlua1wiIHBhZGRpbmc9ezJ9PnsnQ29ubmVjdCB5b3VyIEV0c3kgQWNjb3VudCd9PC9MaW5rPlxuICAgICAgPFRleHQgcGFkZGluZz17Mn0+eydFbnRlciB0aGUgdmVyaWZpY2F0aW9uIGtleSBiZWxvdyd9PC9UZXh0PlxuICAgICAgPElucHV0XG4gICAgICAgIHZhbHVlPXt2ZXJpZmllclZhbHVlfVxuICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRWZXJpZmllclZhbHVlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgd2lkdGg9XCIyMDBweFwiXG4gICAgICAgIG1hcmdpbj17Mn1cbiAgICAgIC8+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e3N1Ym1pdFZlcmlmaWVyfSBtYXJnaW49ezJ9PnsnU3VibWl0IHZlcmlmaWNhdGlvbiBrZXknfTwvQnV0dG9uPlxuICAgIDwvPik7XG4gIH1cblxuICBpZiAodmVyaWZ5aW5nS2V5KSB7XG4gICAgY29udGVudCA9ICg8PlxuICAgICAgPFRleHQgdGV4dENvbG9yPVwib3JhbmdlXCIgcGFkZGluZz17Mn0+eydWZXJpZnlpbmcgeW91ciBrZXkgLSBwbGVhc2Ugd2FpdCd9PC9UZXh0PlxuICAgICAgPFRleHQ+VGhpcyBtYXkgdGFrZSBhIGZldyBtaW51dGVzPC9UZXh0PlxuICAgIDwvPik7XG4gIH1cblxuICByZXR1cm4gKDxCb3ggZGlzcGxheT1cImZsZXhcIiBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIHBhZGRpbmc9ezR9Pntjb250ZW50fTwvQm94Pik7XG59XG5cbi8vIFNob3cgYSBwcmV2aWV3IG9mIHRoZSBldHN5IGxpc3RpbmcgYW5kIGEgYnV0dG9uIHRvIGNyZWF0ZSBpdFxuZnVuY3Rpb24gTGlzdGluZ1ByZXZpZXcoe1xuICB0YWJsZSxcbiAgc2VsZWN0ZWRSZWNvcmRJZCxcbn0pIHtcbiAgY29uc3QgW2NyZWF0aW9uU3RhdGUsIHNldENyZWF0aW9uU3RhdGVdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gc2VuZERyYWZ0TGlzdGluZyhsaXN0aW5nVGl0bGUsIGxpc3RpbmdEZXNjcmlwdGlvbiwgbGlzdGluZ1ByaWNlLCBsaXN0aW5nUXVhbnRpdHksIHNoaXBwaW5nVGVtcGxhdGUpIHtcbiAgICBzZXRDcmVhdGlvblN0YXRlKCdDcmVhdGluZyB5b3VyIGxpc3RpbmcgaW4gRXRzeScpO1xuXG4gICAgdmFyIG9hdXRoID0gbmV3IE9BdXRoKHtcbiAgICAgIGNvbnN1bWVyOiB7XG4gICAgICAgIGtleTogZXRzeUFwaUtleSxcbiAgICAgICAgc2VjcmV0OiBldHN5U2hhcmVkU2VjcmV0LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHZhciByZXF1ZXN0RGF0YSA9IHtcbiAgICAgIC8vdXJsOiAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cHM6Ly9vcGVuYXBpLmV0c3kuY29tL3YyL2xpc3RpbmdzJyxcbiAgICAgIHVybDogJ2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHBzOi8vb3BlbmFwaS5ldHN5LmNvbS92My9hcHBsaWNhdGlvbi9zaG9wcy8xNTkxMTUwOS9saXN0aW5ncycsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB9O1xuXG4gICAgdmFyIGxpc3RpbmdEYXRhID0ge1xuICAgICAgcXVhbnRpdHk6IGxpc3RpbmdRdWFudGl0eSxcbiAgICAgIHRpdGxlOiBsaXN0aW5nVGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbjogbGlzdGluZ0Rlc2NyaXB0aW9uLFxuICAgICAgcHJpY2U6IGxpc3RpbmdQcmljZSxcbiAgICAgIHNoaXBwaW5nX3RlbXBsYXRlX2lkOiBzaGlwcGluZ1RlbXBsYXRlLFxuICAgICAgdGF4b25vbXlfaWQ6IDEsXG4gICAgICBzdGF0ZTogJ2RyYWZ0JyxcbiAgICAgIHdob19tYWRlOiAnaV9kaWQnLFxuICAgICAgaXNfc3VwcGx5OiBmYWxzZSxcbiAgICAgIHdoZW5fbWFkZTogJ21hZGVfdG9fb3JkZXInLFxuICAgIH1cblxuICAgIHZhciB0b2tlbiA9IHtcbiAgICAgICAga2V5OiBnbG9iYWxDb25maWcuZ2V0KCdldHN5T2F0aFRva2VuJyksXG4gICAgICAgIHNlY3JldDogZ2xvYmFsQ29uZmlnLmdldCgnZXRzeU9hdGhTZWNyZXQnKSxcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3REYXRhLnVybCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBtb2RlOiAnY29ycycsXG4gICAgICBjYWNoZTogJ25vLWNhY2hlJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgLi4ub2F1dGgudG9IZWFkZXIob2F1dGguYXV0aG9yaXplKHJlcXVlc3REYXRhLCB0b2tlbikpLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGxpc3RpbmdEYXRhKSxcbiAgICB9KTtcbiAgICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgc2V0Q3JlYXRpb25TdGF0ZShcIk1hZGUgaW4gRXRzeSwgaGVhZCBvdmVyIHRvIHlvdXIgYWNjb3VudCB0byBjaGVjayBvdXQgdGhlIGRyYWZ0XCIpO1xuICB9XG5cbiAgLy8gUmUtcmVuZGVyIGlmIHRoZSByZWNvcmQgY2hhbmdlc1xuICBjb25zdCBzZWxlY3RlZFJlY29yZCA9IHVzZVJlY29yZEJ5SWQodGFibGUsIHNlbGVjdGVkUmVjb3JkSWQgPyBzZWxlY3RlZFJlY29yZElkIDogJycpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7IC8vIFJlc2V0IGNyZWF0aW9uIHN0YXRlIGlmIHJlY29yZCBjaGFuZ2VzXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVzZXRDcmVhdGlvblN0YXRlKCkge1xuICAgICAgc2V0Q3JlYXRpb25TdGF0ZShcIlwiKTtcbiAgICB9XG4gICAgcmVzZXRDcmVhdGlvblN0YXRlKCk7XG4gIH0sIFtzZWxlY3RlZFJlY29yZElkXSk7XG5cbiAgY29uc3QgdGl0bGUgPSBzZWxlY3RlZFJlY29yZC5nZXRDZWxsVmFsdWUoJ1RpdGxlJyk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gc2VsZWN0ZWRSZWNvcmQuZ2V0Q2VsbFZhbHVlKCdEZXNjcmlwdGlvbicpO1xuICBjb25zdCBwcmljZSA9IHNlbGVjdGVkUmVjb3JkLmdldENlbGxWYWx1ZSgnUHJpY2UnKTtcbiAgY29uc3QgcXVhbnRpdHkgPSBzZWxlY3RlZFJlY29yZC5nZXRDZWxsVmFsdWUoJ1F1YW50aXR5Jyk7XG4gIGNvbnN0IHNoaXBwaW5nVGVtcGxhdGVJRCA9IGdsb2JhbENvbmZpZy5nZXQoJ3NoaXBwaW5nVGVtcGxhdGVJRCcpO1xuXG4gIGlmICghdGl0bGUgfHwgIWRlc2NyaXB0aW9uIHx8ICFwcmljZSB8fCAhcXVhbnRpdHkpIHsgLy8gTmVlZCB0byBoYXZlIGFsbCBmaWVsZHMgZmlsbGVkIGluIHRvIHNlbmQgdGhlIEFQSSByZXF1ZXN0XG4gICAgcmV0dXJuICg8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZmxleERpcmVjdGlvbj1cImNvbHVtblwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIiBwYWRkaW5nPXs0fT5cbiAgICAgIDxUZXh0IHBhZGRpbmc9ezJ9PlBsZWFzZSBmaWxsIGluIGFsbCB0aGUgcmVxdWlyZWQgZmllbGRzPC9UZXh0PjtcbiAgICA8L0JveD4pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIiBwYWRkaW5nPXs0fT5cbiAgICAgIDxUZXh0IHBhZGRpbmc9ezJ9PjxiPlRpdGxlPC9iPiA6IHt0aXRsZX08L1RleHQ+XG4gICAgICA8VGV4dCBwYWRkaW5nPXsyfT48Yj5EZXNjcmlwdGlvbjwvYj4gOiB7ZGVzY3JpcHRpb259PC9UZXh0PlxuICAgICAgPFRleHQgcGFkZGluZz17Mn0+PGI+UHJpY2U8L2I+IDoge3ByaWNlfTwvVGV4dD5cbiAgICAgIDxUZXh0IHBhZGRpbmc9ezJ9PjxiPlF1YW50aXR5PC9iPiA6IHtxdWFudGl0eX08L1RleHQ+XG4gICAgICA8QnV0dG9uIG1hcmdpbj17Mn0gb25DbGljaz17KCkgPT4gc2VuZERyYWZ0TGlzdGluZyh0aXRsZSwgZGVzY3JpcHRpb24sIHByaWNlLCBxdWFudGl0eSwgc2hpcHBpbmdUZW1wbGF0ZUlEKX0+eydNYWtlIChEcmFmdCkgRXRzeSBMaXN0aW5nJ308L0J1dHRvbj5cbiAgICAgIHtjcmVhdGlvblN0YXRlICYmIDxUZXh0IHRleHRDb2xvcj1cIm9yYW5nZVwiIHBhZGRpbmc9ezJ9PntjcmVhdGlvblN0YXRlfTwvVGV4dD59XG4gICAgPC9Cb3g+KTtcbiAgfVxufVxuXG5pbml0aWFsaXplQmxvY2soKCkgPT4gPEV0c3lMaXN0aW5nQmxvY2sgLz4pO1xuIl19