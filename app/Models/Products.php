<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Products extends Model {

    protected $table = 'products';
    protected $fillable = ['name'];
    protected $hidden = ['pivot'];
    public function attributes(): BelongsToMany {
        return $this->belongsToMany(AttributeValues::class, 'product_parameter_values', 'product_id', 'value_id');
    }
}
