<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import Data from './Data.svelte'
    let data
    export let label = ""
    export let figma = true;
    export let id = undefined;

    export let selectedFrames = [];
    let frame1Matched = false;
    let frame2Matched = false;
    let frame3Matched = false;
    let frame4Matched = false;

    function buttonClicked() {
        dispatch('buttonClicked');
    }

    // for each selected frame
    $: data, matchFrames();
    function matchFrames() {
        if (data) {
            // Reset matches
            frame1Matched = false;
            frame2Matched = false;
            frame3Matched = false;
            frame4Matched = false;
            
            // Loop through all frames in data
            for (var di = 0; di < data.frames.length; di++) {
                // Check if this frame is selected
                if (selectedFrames.includes(data.frames[di].id)) {
                    // Check if selected frame has type that matches id
                    if (data.frames[di].source.type === id) {
                        if (data.frames[di].id === 1) { frame1Matched = true}
                        else if (data.frames[di].id === 2) { frame2Matched = true}
                        else if (data.frames[di].id === 3) { frame3Matched = true}
                        else if (data.frames[di].id === 4) { frame4Matched = true}
                    } else if (data.frames[di].source.type !== "figma" && id == "customUrl" ) {
                        if (data.frames[di].id === 1) { frame1Matched = true}
                        else if (data.frames[di].id === 2) { frame2Matched = true}
                        else if (data.frames[di].id === 3) { frame3Matched = true}
                        else if (data.frames[di].id === 4) { frame4Matched = true}
                    }
                }
            }
        }
    }
</script>

<Data bind:data="{data}"/>

<div on:click={buttonClicked} class="text-base w-full h-12 flex flex-row justify-center items-center rounded border border-gray-300 select-none hover:border-gray-500 active:border-gray-500 active:bg-gray-400">
    {#if figma === true}
        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="11" height="18" fill="none" viewBox="0 0 11 18">
            <path fill="#1ABCFE" d="M5.5 8.917a2.75 2.75 0 115.5 0v.166a2.75 2.75 0 01-5.5 0v-.166z"/>
            <path fill="#0ACF83" d="M0 14.667a2.833 2.833 0 012.833-2.834H5.5v2.917a2.75 2.75 0 11-5.5 0v-.083z"/>
            <path fill="#FF7262" d="M5.5.5v5.667h2.667a2.833 2.833 0 000-5.667H5.5z"/>
            <path fill="#F24E1E" d="M0 3.333a2.833 2.833 0 002.833 2.834H5.5V.5H2.833A2.833 2.833 0 000 3.333z"/>
            <path fill="#A259FF" d="M0 9a2.833 2.833 0 002.833 2.833H5.5V6.167H2.833A2.833 2.833 0 000 9z"/>
        </svg>
    {/if}
    {label}
    <!--
    {#if frame1Matched}<p>1</p>{/if}
    {#if frame2Matched}<p>2</p>{/if}
    {#if frame3Matched}<p>3</p>{/if}
    -->
</div>