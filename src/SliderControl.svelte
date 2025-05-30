<script>
    import RangeSlider from "svelte-range-slider-pips";
    import Data from './Data.svelte'
    let data
    let frame1Value = 100
    let frame2Value = 100
    let frame3Value = 100
    let frame4Value = 100
    export let min = 0;
    export let max = 200;
    export let value = [100]
    export let label = "label"
    export let id = ""
    export let selectedFrames = []

    $: data, getAdjustmentValue()
    function getAdjustmentValue() {
      if (data) {
        frame1Value = data.frames[0].adjustments[id]
        frame2Value = data.frames[1].adjustments[id]
        frame3Value = data.frames[2].adjustments[id]
        frame4Value = data.frames[3].adjustments[id]
      }
    }

</script>

<style>
  :global(:root) {
    --range-handle-border: transparent;
  }
  :global(.rangeSlider) {
    @apply h-0.5 bg-gray-200 m-0;
  }
  :global(.rangeSlider .rangeBar) {
      @apply h-0.5 bg-gray-900;
  }
  :global(.rangeSlider.focus .rangeBar) {
      @apply h-0.5 bg-gray-900;
  }
  :global(.rangeSlider .rangeHandle .rangeNub, .rangeSlider .rangeHandle.active .rangeNub) {
    @apply bg-white border-2 border-gray-900 rounded-full -mt-1;
  }
  :global(.rangeSlider .rangeHandle.hoverable .rangeNub:hover) {
    @apply border-8 bg-gray-100;
  }
  :global(.rangeSlider .rangeHandle.press .rangeNub ) {
    @apply border-8 bg-gray-200;
  }
</style>

<Data bind:data="{data}"/>

<div>
  <div class="flex flex-row justify-between mb-4">
    <p>{label}</p>
    <div class="flex flex-row space-x-4">
      {#if selectedFrames.includes(1)}
        <p class="text-blue-400">{frame1Value}</p>
      {/if}
      {#if selectedFrames.includes(2)}
        <p class="text-green-400">{frame2Value}</p>
      {/if}
      {#if selectedFrames.includes(3)}
        <p class="text-purple-400">{frame3Value}</p>
      {/if}
      {#if selectedFrames.includes(4)}
        <p class="text-pink-400">{frame4Value}</p>
      {/if}
    </div>
    <!--<p>{value}</p>-->
  </div>
  <RangeSlider bind:values={value} min={min} max={max} range="min"/>
</div>