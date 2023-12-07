<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreferences extends Model
{
    use HasFactory;
    protected $table = 'user_preferences';

    protected $fillable = ['selected_sources', 'selected_authors', 'selected_categories'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
