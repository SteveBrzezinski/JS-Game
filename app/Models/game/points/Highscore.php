<?php

namespace App\Models\game\points;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Highscore extends Model
{
    use HasFactory;

    protected $fillable = [
        'highscore'
    ];
}
