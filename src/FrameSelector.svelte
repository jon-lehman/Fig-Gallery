<script>
    export let frameNumber = 1;
    export let frameColor = "blue";
    export let selected = true;

</script>

<div class="flex flex-col items-center space-y-2 select-none" on:click="{() => selected = !selected}">

    {#if selected}
        <div class="p-4 border border-{frameColor}-300 rounded ring-1 ring-{frameColor}-300">
            <div class="h-32 w-16 flex justify-center items-center bg-gray-300 rounded-sm">
                <p class="font-semibold text-3xl">{frameNumber}</p>
            </div>
        </div>
    {:else}
        <div class="p-4 border border-gray-300 rounded">
            <div class="h-32 w-16 flex justify-center items-center bg-gray-300 rounded-sm">
                <p class="font-semibold text-3xl">{frameNumber}</p>
            </div>
        </div>
    {/if}

    {#if selected === true}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path class="text-{frameColor}-500 fill-current" fill-rule="evenodd" d="M12 21.6a9.6 9.6 0 100-19.2 9.6 9.6 0 000 19.2zm4.448-11.152a1.2 1.2 0 00-1.696-1.696L10.8 12.703l-1.552-1.551a1.2 1.2 0 00-1.696 1.696l2.4 2.4a1.2 1.2 0 001.696 0l4.8-4.8z" clip-rule="evenodd"/>
        </svg>
    {/if}

</div>