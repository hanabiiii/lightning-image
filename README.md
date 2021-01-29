# lightning-image

`lightning-image` is a Lightning Web Component specially designed to easily
optimize image loading. It's optimized for fixed width/height images and images that stretch the full-width of a container.

Using [Salesforce CRM Content thumbnail rendition servlet](https://developer.salesforce.com/blogs/engineering/2014/04/building-content-rich-visualforce-pages-with-salesforce-crm-content.html) to optimize the thumbnail's size.


## Table of Contents

- [Problem](#problem)
- [Solution](#solution)
- [Install](#install)
- [How to use](#how-to-use)
- [Resolution switching](#resolution-switching)
- [lightning-image Props](#lightning-image-props)

## Problem

Large, unoptimized images dramatically slow down your site.

But creating optimized images for websites has long been a thorny problem.
Ideally you would:

- Resize large images to the size needed by your design
- Generate multiple smaller images so smartphones and tablets don't download
  desktop-sized images
- Efficiently lazy load images to speed initial page load and save bandwidth
- Hold the image position so your page doesn't jump while images load

Doing this consistently across a site feels like sisyphean labor. You manually
optimize your images and then… several images are swapped in at the last minute
or a design-tweak shaves 100px of width off your images.

This isn't ideal. Optimized images should be easy and the default.

## Solution

`lightning-image` works seamlessly with [Salesforce CRM Content thumbnail rendition servlet](https://developer.salesforce.com/blogs/engineering/2014/04/building-content-rich-visualforce-pages-with-salesforce-crm-content.html). To produce perfect images,
you need only:

1. Install `lightning-image` and use it in place of the built-in `img`
2. Write a controller to query the Content thumbnail
   which specify the fields needed by `lightning-image`.


## Install

There are two ways to install this component:

-   [Using a Scratch Org](#installing-to-your-org): This is the recommended installation option. Use this option if you are a developer who wants to experience the code.
-   [Using an Unmanaged Package](#installing-using-an-unmanaged-package): This option allows anybody to experience the sample app without installing a local development environment.

### Installing to your Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

-   Install Salesforce CLI
-   Install Visual Studio Code
-   Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2. If you haven't already done so, authenticate with your org

```
sfdx force:auth:web:login
```

3. Clone the repository:

```
git clone https://github.com/hanabiiii/lightning-image.git
cd lightning-image
```

4. Deploy the component to your org:

```
sfdx force:source:deploy -m LightningComponentBundle:lightningImage -u [your-account]
```


### Installing using an Unmanaged Package

Click [this link](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t2v000007OdCI) to install the unmanaged package in your org.


## How to use

Please check the example component: [Case Attachments](/force-app/main/default/aura/CaseAttachments/CaseAttachments.cmp).

## Resolution switching

`lightning-image` supports showing different images at different breakpoints, which is known as [Resolution switching: Different sizes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Different_sizes).


## `lightning-image` props

| Name                   | Type                | Description                                                                                                                                   |
| ---------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                | `string`            | Passed to the `img` element.                                                                                                                  |
| `alt`                  | `string`            | Passed to the `img` element. Defaults to an empty string. `alt=""`                                                                            |
| `loading`              | `string`            | Set the browser's native [lazy loading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) attribute. One of `lazy` or `eager`. Defaults to `lazy`.                                                |
| `src`                  | `string` / `array`  | Set the image src. Array object to support resolution switching { source, sourceSize , conditionSize , conditionSetSize }.                    |
| `wrapperClass`         | `string`            | Spread into the default class of the wrapper element.                                                                                         |
| `wrapperStyle`         | `string`            | Spread into the default styles of the wrapper element.                                                                                        |
| `imageClass`           | `string`            | Spread into the default class of the actual `img` element.                                                                                    |
| `imageStyle`           | `string`            | Spread into the default styles of the actual `img` element.                                                                                   |
| `placeholderColor`     | `string`            | Set a colored background placeholder. You can also pass in any valid color string. Defaults to `lightgray`.                                   |
| `imagePlaceholder`     | `named slot`        | Used to replace the default placeholder.                                                                                                      |
| `durationFadeIn`       | `number`            | Fading duration is set up to 500ms by default.                                                                                                |
| `onload`               | `event`             | An event that is called when the full-size image has loaded.                                                                                  |
| `onstartload`          | `event`             | An event that is called when the full-size image starts loading.                                                                              |
| `onerror`              | `event`             | An event that is called when the image fails to load.                                                                                         |

