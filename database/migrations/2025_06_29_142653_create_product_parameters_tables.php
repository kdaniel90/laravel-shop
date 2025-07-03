<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_parameters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('product_parameters_values', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('parameters_values', function (Blueprint $table) {
            $table->unsignedBigInteger('parameter_id');
            $table->unsignedBigInteger('value_id');
            $table->foreign('parameter_id')->references('id')->on('product_parameters');
            $table->foreign('value_id')->references('id')->on('product_parameters_values');
        });

        Schema::create('product_parameter_values', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('value_id');
            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('value_id')->references('id')->on('product_parameters_values');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_parameters');
        Schema::dropIfExists('product_parameters_values');
        Schema::dropIfExists('parameters_values');
        Schema::dropIfExists('product_parameter_values');
    }
};
