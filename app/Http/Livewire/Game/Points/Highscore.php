<?php

namespace App\Http\Livewire\Game\Points;

use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use App\Models\game\points\Highscore as high;

class Highscore extends Component
{
    public $newScore;
    public $highscoreToggle = false;

    public $listeners = [
        'newScore' => 'updateNewScore'
    ];

    public function updateNewScore($value)
    {
        $this->newScore = $value;
        $high = high::where('user_id', Auth::user()->id)->first();
        if($high->highscore < $this->newScore){
            high::where('user_id', Auth::user()->id)
                ->update([
                    'highscore' => $this->newScore
                ]);
            $this->highscoreToggle = true;
        }
    }

    public function render()
    {
        return view('livewire.game.points.highscore', [
            'highscore' => high::where('user_id', Auth::user()->id)->first(),
        ]);
    }
}
