import { LightningElement, api, track } from 'lwc';

export default class LightningImage extends LightningElement {

    // style attributes
    @api placeholderColor;
    @api durationFadeIn = 500;//ms

    // img attributes
    @api title = '';
    @api alt = '';
    @api src;
    @api loading = 'lazy'; /* eager | lazy */

    @track srcSet;
    @track srcSize;
    @track defaultSrc;
    @track imageLoaded = false;

    @track _wrapperClass = 'lightning-image-wrapper';
    @api get wrapperClass() {
        return this._wrapperClass;
    }
    set wrapperClass(value) {
        this._wrapperClass += ` ${value}`;
    }

    @api wrapperStyle = '';

    @track _imageClass = 'lightning-image';
    @api get imageClass() {
        return this._imageClass;
    }
    set imageClass(value) {
        this._imageClass += `${value}`;
    }

    @track _imageStyle = '';
    @api get imageStyle() {
        let style = '';
        style += `opacity: ${(this.imageLoaded ? 1 : 0)};`;
        style += this.transitionDelay;
        style += `${this._imageStyle}`;
        return style;
    }
    set imageStyle(value) {
        this._imageStyle = value;
    }

    get transitionDelay() {
        let style = '';
        style += `transition: opacity ${(this.durationFadeIn > 0 ? this.durationFadeIn + 'ms' : 'none')};`;
        style += `transition-delay: ${(this.durationFadeIn > 0 ? this.durationFadeIn + 'ms' : 'none')};`;
        return style;
    }

    get imagePlaceholderWrapperStyle() {
        let style = 'position: absolute; top: 0; bottom: 0; right: 0; left: 0;';
        style += `opacity: ${(this.imageLoaded ? 0 : 1)};`;
        style += this.transitionDelay;
        return style;
    }
    get imagePlaceholderBackgroundColorStyle() {
        let style = 'height: 100%; width: 100%;';
        style += `background-color: ${(this.isEmpty(this.placeholderColor) ? 'lightgray' : this.placeholderColor)};`;
        return style;
    }

    connectedCallback() {
        this.imageLoaded = false;
        this.generateImageSources();
    }

    handleImageLoaded() {
        this.imageLoaded = true;
        this.onLoad();
    }
    handleOnError(error) {
        this.imageLoaded = true;
        console.log('load error', {...error});
        this.onError();
    }

    generateImageSources() {
        if (this.isEmpty(this.src)) {
            return;
        }

        this.onStartLoad();
        if (typeof this.src === 'string') {
            this.defaultSrc = this.src;
        }
        else if (Array.isArray(this.src)) {
            let srcSet = '';
            let srcSize = '';
            let defaultSource = '';

            for (let index = 0, len = this.src.length; index < len; index++) {
                const { source, sourceSize, conditionSize, conditionSetSize } = this.src[index];

                srcSet += `${source} ${sourceSize}w, `;

                srcSize += `(max-width: ${conditionSize}px) ${conditionSetSize}px, `;
                // last source
                if (index === len - 1) {
                    srcSize += `${conditionSetSize}px`;
                    defaultSource = source;
                }
            }

            this.srcSet = srcSet;
            this.srcSize = srcSize;
            this.defaultSrc = defaultSource;

        }
    }

    onStartLoad() {
        this.dispatchEvent(new CustomEvent('startload'));
    }
    onLoad() {
        this.dispatchEvent(new CustomEvent('load'));
    }
    onError() {
        this.dispatchEvent(new CustomEvent('error'));
    }

    isEmpty(obj) {
        if (obj === undefined || obj === null || obj === '') {
            return true;
        }
        if (Array.isArray(obj)) {
            return obj.length === 0;
        } else if (typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]') {
            return Object.keys(obj).length === 0;
        }
        return false;
    };
}