<script>
    export let activeTab = "source"
</script>

<style>
    .moveLeft {left: 50%;} 
</style>

<div class="h-11 px-9 relative bg-white border-t border-b border-gray-200">
    <!-- Tab Items -->
    <div class="flex h-11 w-full items-center">
        <div class="h-full w-full flex justify-around items-center cursor-pointer" on:click={() => activeTab = "source"}>
            <p class:font-medium="{activeTab === 'source'}" >Source</p>
        </div>
        <div class="h-full w-full flex justify-around items-center cursor-pointer" on:click={() => activeTab = "adjustments"}>
            <p class:font-medium="{activeTab === 'adjustments'}">Adjustments</p>
        </div>
    </div>
    <!-- Underline -->
    <div class="relative">
        <div class="absolute bottom-0 left-0 w-2/4 h-0.5 bg-gray-900 transition-all" class:moveLeft="{activeTab === 'adjustments'}"></div>
    </div>
</div>