'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React port of ellipsis.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Original ellipsis.js author: Gregory Linford
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * react-truncate-html author: Jari Zwarts (https://jari.io/)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isServer = function isServer() {
    return typeof window === 'undefined';
};

var Truncate = function (_Component) {
    _inherits(Truncate, _Component);

    function Truncate() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Truncate);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Truncate.__proto__ || Object.getPrototypeOf(Truncate)).call.apply(_ref, [this].concat(args))), _this), _this.cached = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Truncate, [{
        key: 'render',
        value: function render() {
            // pass any additional props to the paragraph element
            var passedProps = _extends({}, this.props);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(Truncate.propTypes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    delete passedProps[key];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (this.props.children) {
                console.error('react-truncate-html: We can\'t handle react children at the moment.\nYou\'re %crequired%c to pass dangerouslySetInnerHTML to set contents. Sorry!', 'font-style:italic', 'font-style:normal');
                return null;
            }
            var dangerouslySetInnerHTML = this.props.dangerouslySetInnerHTML;
            var __html = dangerouslySetInnerHTML.__html;

            var html = { __html: (0, _xss2.default)(__html) };

            return _react2.default.createElement('span', _extends({ ref: 'paragraph' }, passedProps, { dangerouslySetInnerHTML: html }));
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.dangerouslySetInnerHTML !== this.props.dangerouslySetInnerHTML) {
                this.cached = this.refs.paragraph.innerHTML;
                this.add();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!isServer()) {
                this.lines = {
                    props: this.props,
                    get current() {
                        if (this.props.portrait && window.innerHeight > window.innerWidth) {
                            return this.props.portrait;
                        }
                        return this.props.lines;
                    }
                };

                if (this.props.responsive) {
                    this.cached = this.refs.paragraph.innerHTML;
                    var debounce = void 0;
                    var listener = function listener() {
                        clearTimeout(debounce);
                        debounce = setTimeout(function () {
                            this.add();
                        }.bind(this), this.props.debounce);
                    };
                    this._listener = listener.bind(this);

                    window.addEventListener('resize', this._listener, false);
                }

                this.add();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.responsive && this._listener) {
                window.removeEventListener('resize', this._listener, false);
            }
        }
    }, {
        key: 'createProp',
        value: function createProp(element) {
            this.prop = {
                get height() {
                    var viewportOffset = element.getBoundingClientRect();
                    return parseInt(viewportOffset.bottom - viewportOffset.top, 10);
                },
                get lineheight() {
                    var lineh = getComputedStyle(element).getPropertyValue('line-height');
                    if (String('normal|initial|inherit').indexOf(lineh) > -1) {
                        //very specific case
                        lineh = parseInt(getComputedStyle(element).getPropertyValue('font-size'), 10) + 2;
                    }
                    return parseInt(lineh, 10);
                }
            };
        }
    }, {
        key: 'add',
        value: function add() {
            if (this.props.responsive) {
                if (this.refs.paragraph.innerHTML !== this.cached) {
                    this.refs.paragraph.innerHTML = this.cached;
                }
            }

            this.createProp(this.refs.paragraph);

            if (this.isNotCorrect()) {
                if (this.refs.paragraph.childNodes.length && this.refs.paragraph.childNodes.length > 1) {
                    this.handleChilds(this.refs.paragraph);
                } else if (this.refs.paragraph.childNodes.length && this.refs.paragraph.childNodes.length === 1 && this.refs.paragraph.childNodes[0].nodeType === 3) {
                    this.simpleText(this.refs.paragraph);
                }
            }
        }
    }, {
        key: 'breakWord',
        value: function breakWord(str, str2, fix) {
            var words = str.split(' ');
            words.pop();
            if (fix) {
                words.pop();
            }
            if (!str2) {
                if (words[words.length - 1]) {
                    words[words.length - 1] = words[words.length - 1].replace(/(,$)/g, '').replace(/(\.$)/g, '');
                }
                words.push(this.conf.ellipsis);
                return words.join(' ');
            } else {
                if (words[words.length - 1]) {
                    words[words.length - 1] = words[words.length - 1].replace(/(,$)/g, '').replace(/(\.$)/g, '');
                    words.push(this.conf.ellipsis);
                    return [words.join(' '), str2];
                } else if (!words[words.length - 1] && str2) {
                    var st = ' ' + str2.trim().replace(/(,$)/g, '').replace(/(\.$)/g, '') + ' ';
                    words.push(this.conf.ellipsis);
                    return [words.join(' '), st];
                }
            }
        }
    }, {
        key: 'simpleText',
        value: function simpleText(element) {
            var childText = element.childNodes[0].nodeValue;
            while (this.prop.height > this.prop.lineheight * this.lines.current) {
                element.childNodes[0].nodeValue = childText.slice(0, -1);
                childText = element.childNodes[0].nodeValue;
            }
            if (this.props.breakWord) {
                element.childNodes[0].nodeValue = childText.slice(0, -this.props.ellipsis.length) + this.props.ellipsis;
                if (this.isNotCorrect()) {
                    //edge case
                    element.childNodes[0].nodeValue = ' ' + element.childNodes[0].nodeValue.slice(0, -(this.props.ellipsis.length + 1)).trim().slice(0, -this.props.ellipsis.length) + this.props.ellipsis;
                }
            } else {
                element.childNodes[0].nodeValue = this.breakWord(element.childNodes[0].nodeValue);
                if (this.isNotCorrect()) {
                    //edge case
                    element.childNodes[0].nodeValue = this.breakWord(element.childNodes[0].nodeValue, null, true);
                }
            }
        }
    }, {
        key: 'isNotCorrect',
        value: function isNotCorrect() {
            return this.prop.height > this.prop.lineheight * this.lines.current;
        }
    }, {
        key: 'processBreak',
        value: function processBreak(dOne, dTwo, fix) {
            var r = this.breakWord(dOne.innerHTML || dOne.nodeValue, dTwo.innerHTML || dTwo.nodeValue, fix);
            if (dOne.innerHTML) {
                dOne.innerHTML = r[0];
            } else {
                dOne.nodeValue = r[0];
            }
            if (dTwo.innerHTML) {
                dTwo.innerHTML = r[1];
            } else {
                dTwo.nodeValue = r[1];
            }
        }
    }, {
        key: 'handleChilds',
        value: function handleChilds(e) {
            var domChilds = e.childNodes;
            var childText = void 0;
            for (var i = domChilds.length - 1; i >= 0; i--) {
                var displayOrigin = void 0;
                if (domChilds[i].nodeType === 3) {
                    displayOrigin = domChilds[i].nodeValue;
                    domChilds[i].nodeValue = '';
                } else if (domChilds[i].nodeType === 1) {
                    displayOrigin = getComputedStyle(domChilds[i]).getPropertyValue('display');
                    domChilds[i].style.display = 'none';
                }

                if (this.prop.height <= this.prop.lineheight * this.lines.current) {
                    if (domChilds[i].nodeType === 3) {
                        domChilds[i].nodeValue = displayOrigin;
                        childText = domChilds[i].nodeValue;
                        while (this.prop.height > this.prop.lineheight * this.lines.current) {
                            domChilds[i].nodeValue = childText.slice(0, -1);
                            childText = domChilds[i].nodeValue;
                        }

                        if (this.props.breakWord) {
                            domChilds[i].nodeValue = childText.slice(0, -this.props.ellipsis.length) + this.props.ellipsis;
                            if (this.isNotCorrect()) {
                                //edge case
                                domChilds[i].nodeValue = ' ' + domChilds[i].nodeValue.slice(0, -this.props.ellipsis.length).trim().slice(0, -this.props.ellipsis.length);
                                if (domChilds[i].nodeValue.length > 1) {
                                    domChilds[i].nodeValue = domChilds[i].nodeValue.slice(0, -this.props.ellipsis.length) + this.props.ellipsis;
                                } else {
                                    continue;
                                }
                            }
                        } else {
                            if (!domChilds[i].innerHTML && !domChilds[i].nodeValue) {
                                continue;
                            }
                            this.processBreak(domChilds[i], domChilds[i - 1]);
                            if (this.isNotCorrect()) {
                                //edge case
                                this.processBreak(domChilds[i], domChilds[i - 1], true);
                                if (this.isNotCorrect()) {
                                    e.removeChild(domChilds[i]);
                                    continue;
                                }
                            }
                        }
                    } else {
                        domChilds[i].style.display = displayOrigin;
                        childText = domChilds[i].innerHTML;
                        while (this.prop.height > this.prop.lineheight * this.lines.current) {
                            domChilds[i].innerText = childText.slice(0, -1);
                            childText = domChilds[i].innerText;
                        }
                        if (this.props.breakWord) {
                            domChilds[i].innerHTML = childText.slice(0, -this.props.ellipsis.length) + this.props.ellipsis;
                            if (this.isNotCorrect()) {
                                //edge case
                                domChilds[i].innerHTML = ' ' + domChilds[i].innerHTML.slice(0, -this.props.ellipsis.length).trim().slice(0, -this.props.ellipsis.length);
                                if (domChilds[i].innerHTML.length > 1) {
                                    domChilds[i].innerHTML = domChilds[i].innerHTML.slice(0, -this.props.ellipsis.length) + this.props.ellipsis;
                                } else {
                                    continue;
                                }
                            }
                        } else {
                            if (!domChilds[i].innerHTML && !domChilds[i].nodeValue) {
                                continue;
                            }
                            this.processBreak(domChilds[i], domChilds[i - 1]);
                            if (this.isNotCorrect()) {
                                //edge case
                                this.processBreak(domChilds[i], domChilds[i - 1], true);
                                if (this.isNotCorrect()) {
                                    e.removeChild(domChilds[i]);
                                    continue;
                                }
                            }
                        }
                    }
                    break;
                } else {
                    e.removeChild(domChilds[i]);
                }
            }
        }
    }]);

    return Truncate;
}(_react.Component);

Truncate.propTypes = {
    ellipsis: _propTypes2.default.string,
    debounce: _propTypes2.default.number,
    responsive: _propTypes2.default.bool,
    lines: _propTypes2.default.number,
    portrait: _propTypes2.default.number,
    breakWord: _propTypes2.default.bool
};
Truncate.defaultProps = {
    ellipsis: '…',
    debounce: 100,
    responsive: true,
    lines: 2,
    portrait: null,
    breakWord: true
};
exports.default = Truncate;

