<script>
    import Data from './Data.svelte'
    import { onMount } from 'svelte';

    // Define data and frame
    let data
    export let frameID = 1; 

    // Defining default frame source and adjustments
    let frameSourceContent;
    let frameSourceType;
    let frameBrightness;
    let frameContrast;
    let frameGrayScale;
    let frameHueRotate;
    let frameSaturation;
    let frameInvert;

    // Define Figma Defaults
    let figmaToken = "210457-300eb6ab-c9b5-44de-b892-bdc6fa5a14ac";
    let figmaID = "BBFCiriAuhbSNwVvMBlEGV"
    let figmaNode
    let figmaImage

    // Define Non-Figma Defaults
    let imageUrl
    let videoUrl
    let iframeUrl
    let sketchfabID

    // Updating frame source and adjustments
    $: data, updateFrame()
    function updateFrame() {
        if (data !== undefined) {
            for (var i = 0; i < data.frames.length; i++) {
                if ( data.frames[i].id === frameID ) {
                    frameSourceContent = data.frames[i].source.content;
                    frameSourceType = data.frames[i].source.type;
                    frameBrightness = data.frames[i].adjustments.brightness;
                    frameContrast = data.frames[i].adjustments.contrast;
                    frameGrayScale = data.frames[i].adjustments.grayScale;
                    frameHueRotate = data.frames[i].adjustments.hueRotate;
                    frameSaturation = data.frames[i].adjustments.saturation;
                    frameInvert = data.frames[i].adjustments.invert;
                }
            }
        }
    }

    // Define and retrieve figma frame if set
    $: if (frameSourceType === "figma") {
        // Defining FigmaNode
        if (frameSourceContent === "alpha") {
            if (frameID === 1) {figmaNode = "1:7"}
            else if (frameID === 2) {figmaNode = "1:35"}
            else if (frameID === 3) {figmaNode = "1:40"}
        } else if (frameSourceContent === "bravo") {
            if (frameID === 1) {figmaNode = "1:52"}
            else if (frameID === 2) {figmaNode = "1:80"}
            else if (frameID === 3) {figmaNode = "1:85"}
        } else if (frameSourceContent === "charlie") {
            if (frameID === 1) {figmaNode = "1:97"}
            else if (frameID === 2) {figmaNode = "1:125"}
            else if (frameID === 3) {figmaNode = "1:130"}
        } else if (frameSourceContent === "delta") {
            if (frameID === 1) {figmaNode = "1:142"}
            else if (frameID === 2) {figmaNode = "1:170"}
            else if (frameID === 3) {figmaNode = "1:175"}
        }
        getImage()
    }
    // Retrieve figma frame as image
    async function getImage() {
        let result = await fetch('https://api.figma.com/v1/images/' + figmaID + '?ids=' + figmaNode + '&scale=4', {
            method: 'GET',
            headers: {
            'X-Figma-Token': figmaToken
            }
        })
        let imageData = await result.json()
        figmaImage = imageData.images[figmaNode]
    };

    // Define and retrieve image url
    $: if (frameSourceType === "image") {
        imageUrl = frameSourceContent
    }

    // Define and retrieve video url
    $: if (frameSourceType === "video") {
        videoUrl = frameSourceContent
    }

    // Define and retrieve iframe url
    $: if (frameSourceType === "iframe") {
        iframeUrl = frameSourceContent
    }

    // Define and retrieve sketchfab ID
    $: if (frameSourceType === "sketchfab") {
        sketchfabID = frameSourceContent
        /*
        setTimeout(function(){
            let iframe = document.getElementById('sketchfabWindow').contentDocument
            console.log(iframe)
            iframe.querySelector(".viewer-hint").style.display = "none"
            document.getElementById('sketchfabWindow').click()
            console.log('clicked')
        }, 8000);
        */
    }
</script>

<svelte:head>
  <title>Office Gallery Frame</title>
</svelte:head>

<Data bind:data="{data}"/>

<style>
    :global(body) {background-color: black}
</style>


<div class="wrapper w-screen h-screen pr-12 pt-12" style="filter: brightness({frameBrightness}%) contrast({frameContrast}%) grayscale({frameGrayScale}%) hue-rotate({frameHueRotate}deg) saturate({frameSaturation}%) invert({frameInvert}%)">

    {#if frameSourceType === "figma"}
        <div class="w-full max-w-sreen h-full max-h-screen bg-cover bg-center" style="background-image: url({figmaImage})"></div>
    {:else if frameSourceType === "image"}
        <div class="w-full h-full bg-cover bg-center" style="background-image: url({imageUrl})"></div>
    {:else if frameSourceType === "video"}
        <video class="w-full max-w-sreen h-full max-h-screen object-cover object-center" autoplay loop muted>
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/ogg" />
            <source src={videoUrl} type="video/webm" />
        </video>
    {:else if frameSourceType === "iframe"}
        <iframe title="Website Showcase" 
            src={iframeUrl}
            frameborder="0"
            style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;max-height:100vh;padding-top:3rem; padding-right:3rem;position:absolute;top:0px;left:0px;right:0px;bottom:0px"
            height="100%"
            width="100%">
        </iframe>
    {:else if frameSourceType === "sketchfab"}
        <iframe title="Sketchfab embed"
        frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="fullscreen; autoplay; vr" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share 
            style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;max-height:100vh;padding-top:3rem; padding-right:3rem;position:absolute;top:0px;left:0px;right:0px;bottom:0px"
            src="https://sketchfab.com/models/{sketchfabID}/embed?autospin=1&autostart=1&camera=0&ui_hint=0"> 
        </iframe>
    {:else}
        <p>frame source wrong</p>
    {/if}

</div>

<!--
    <div class="absolute bottom-0">
        <p>source content {frameSourceContent}</p>
        <p>source type {frameSourceType}</p>
        <p>brightness {frameBrightness}</p>
        <p>contrast {frameContrast}</p>
        <p>gray scale {frameGrayScale}</p>
        <p>hue rotation {frameHueRotate}</p>
        <p>saturation {frameSaturation}</p>
    </div>
-->