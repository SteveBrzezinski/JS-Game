<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JS Game</title>
    @vite(['resources/css/app.css',  'resources/js/src/index.js','resources/js/app.js', ])
    @livewireStyles
</head>
<body>
    <div class="flex justify-center align-middle items-center flex-col container w-full h-full">
        <div class="flex flex-row justify-around w-full">
            <p>X = left to right</p>
            <div class="flex flex-col">
                @livewire('game.points.highscore')
            </div>
            <p>Y = up to down</p>
        </div>
        <canvas class="border border-black" id="canvas"></canvas>
    </div>
    @livewireScripts
</body>
</html>
