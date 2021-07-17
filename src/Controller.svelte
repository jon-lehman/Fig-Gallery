<script>
  // use "HOST=0.0.0.0 npm run dev" to run on LAN 

  import { onMount } from 'svelte';
  import Button from "./Button.svelte";
  import Tabs from "./Tabs.svelte";
  import SliderControl from "./SliderControl.svelte";
  import FrameSelector from './FrameSelector.svelte';
  import AuthBanner from './AuthBanner.svelte';
  import customUrlModal from './CustomUrlModal.svelte'

  // Firebase
  import Auth from './Auth.svelte';
  import Data from './Data.svelte'
  import CustomUrlModal from './CustomUrlModal.svelte';

  // Down stream Data
  let data
  let selectedFrames = [];
  let frame1Selected = true;
  let frame2Selected = true;
  let frame3Selected = true;
  let activeTab
  let brightness = [100]
  let contrast = [100]
  let saturation = [100]
  let grayscale = [0]
  let hue = [0]

  // Handle frame selection
  $: frame1Selected, updateFrames(1, frame1Selected)
  $: frame2Selected, updateFrames(2, frame2Selected)
  $: frame3Selected, updateFrames(3, frame3Selected)
  function updateFrames(frameNumber, selected) {
    if (selected === true) {
      selectedFrames.push(frameNumber)
      selectedFrames = selectedFrames;
    } else {
      for( var i = 0; i < selectedFrames.length; i++){ 
        if ( selectedFrames[i] === frameNumber) { 
            selectedFrames.splice(i, 1);
            selectedFrames = selectedFrames;
        }
      }
    }
  }

  // Custom URL Modal Controller 
  let showCustomUrlModal = false
  function toggleModal() {
    showCustomUrlModal = !showCustomUrlModal
  }

  // Update Source with Figma
  function updateSource(type, content) {
    if (data !== undefined) {
      for (var sfi = 0; sfi < selectedFrames.length; sfi++) { 
        for (var di = 0; di < data.frames.length; di++) {
          if (data.frames[di].id === selectedFrames[sfi]) {
            data.frames[di].source.type = type;
            data.frames[di].source.content = content;
          }
        }
      }
    }
  }

  // Update Source with custom Url
  function updateSourceWithUrl(e) {
    if (data !== undefined) {
      for (var sfi = 0; sfi < selectedFrames.length; sfi++) { 
        for (var di = 0; di < data.frames.length; di++) {
          if (data.frames[di].id === selectedFrames[sfi]) {
            data.frames[di].source.type = e.detail.urlType;
            data.frames[di].source.content = e.detail.url;
          }
        }
      }
    }
  }

  // Update adjustments
  $: brightness, updateAdjustment('brightness', brightness)
  $: contrast, updateAdjustment('contrast', contrast)
  $: saturation, updateAdjustment('saturation', saturation)
  $: grayscale, updateAdjustment('grayScale', grayscale)
  $: hue, updateAdjustment('hueRotate', hue)
  function updateAdjustment(type, value) {
    if (data !== undefined) {
      for (var sfi = 0; sfi < selectedFrames.length; sfi++) { 
        for (var di = 0; di < data.frames.length; di++) {
          if (data.frames[di].id === selectedFrames[sfi]) {
            data.frames[di].adjustments[type] = value[0];
          }
        }
      }
    }
  }

  // Reset Adjustments
  function resetAdjustments() {
    if (data !== undefined) {
      for (var sfi = 0; sfi < selectedFrames.length; sfi++) { 
        for (var di = 0; di < data.frames.length; di++) {
          if (data.frames[di].id === selectedFrames[sfi]) {
            data.frames[di].adjustments.brightness = 100;
            data.frames[di].adjustments.contrast = 100;
            data.frames[di].adjustments.grayScale = 0;
            data.frames[di].adjustments.hueRotate = 0;
            data.frames[di].adjustments.saturation = 100;
          }
        }
      }
    }
  }

</script>

<style>
  :global(body) {
    font-family: 'IBM Plex Sans', sans-serif !important;
    box-sizing: border-box;
  }
  .moveControls {
    margin-left: -100%;
  } 
</style>

<svelte:head>
  <title>Office Gallery Controller</title>
  <!-- Google Fonts (IBM Plex Sans)-->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

  <Data bind:data="{data}"/>
</svelte:head>


<Auth useRedirect={true} let:user let:loggedIn let:loginWithGoogle let:logout >
    {#if !loggedIn}
      <div on:click|preventDefault={loginWithGoogle} class="fixed bottom-9 w-full">
        <AuthBanner />
      </div>
    {:else}
      <button type="button" class="text-gray-300 absolute top-1 right-1" on:click={logout}>Logout</button>
    {/if}
</Auth>

<CustomUrlModal bind:showCustomUrlModal="{showCustomUrlModal}" on:castUrl="{updateSourceWithUrl}" />
<main class="w-screen overflow-x-hidden">
  
  <div class="relative h-80">
    <h1 class="text-4xl font-semibold text-center text-gray-900 m-9">Office Gallery</h1>
    <div class="flex flex-row justify-between px-9 sm:justify-center sm:space-x-6">
      <FrameSelector frameNumber={1} frameColor={"blue"} bind:selected={frame1Selected}/>
      <FrameSelector frameNumber={2} frameColor={"green"} bind:selected={frame2Selected}/>
      <FrameSelector frameNumber={3} frameColor={"purple"} bind:selected={frame3Selected}/>
    </div>
  </div>
  
  <Tabs bind:activeTab={activeTab}/>

  <div class="flex flex-row bg-white transition-all" style="width: 200%" class:moveControls="{activeTab === 'adjustments'}">
    
    <div class="flex flex-col w-screen space-y-4 mt-9 px-9">
      <Button label={"Figma Page: Alpha"} id={"alpha"} on:buttonClicked={() => updateSource('figma', 'alpha')} bind:selectedFrames={selectedFrames}/>
      <Button label={"Figma Page: Bravo"} id={"bravo"} on:buttonClicked={() => updateSource('figma', 'bravo')} bind:selectedFrames={selectedFrames}/>
      <Button label={"Figma Page: Charlie"} id={"charlie"} on:buttonClicked={() => updateSource('figma', 'charlie')} bind:selectedFrames={selectedFrames}/>
      <Button label={"Figma Page: Delta"} id={"delta"} on:buttonClicked={() => updateSource('figma', 'delta')} bind:selectedFrames={selectedFrames}/>
      <Button label={"Custom URL"} id={"customUrl"} figma={false} on:buttonClicked="{toggleModal}" bind:selectedFrames={selectedFrames}/>
    </div>
    
    <div class="flex flex-col w-screen space-y-8 my-9 px-9">
      <SliderControl label={"Brightness"} id={"brightness"} bind:value={brightness} bind:selectedFrames={selectedFrames} />
      <SliderControl label={"Contrast"} id={"contrast"} bind:value={contrast} bind:selectedFrames={selectedFrames} />
      <SliderControl label={"Saturation"} id={"saturation"} bind:value={saturation} bind:selectedFrames={selectedFrames} />
      <SliderControl label={"Grayscale"} id={"grayScale"} bind:value={grayscale} max={100} bind:selectedFrames={selectedFrames} />
      <SliderControl label={"Hue"} bind:value={hue} id={"hueRotate"} max={360} bind:selectedFrames={selectedFrames} />
      <Button label={"Reset Adjustments"} figma={false} on:buttonClicked="{resetAdjustments}" />
    </div>
  
  </div>
</main>