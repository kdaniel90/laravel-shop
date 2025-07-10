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
        //
        Schema::table('parameters_values', function (Blueprint $table) {
            $table->dropForeign('parameters_values_parameter_id_foreign');
            $table->foreign('parameter_id')
                ->references('id')->on('product_parameters')
                ->onDelete('cascade')
                ->change();
            $table->dropForeign('parameters_values_value_id_foreign');
            $table->foreign('value_id')
                ->references('id')->on('product_parameters_values')
                ->onDelete('cascade')
                ->change();
        });

        Schema::table('product_parameter_values', function (Blueprint $table) {
            $table->dropForeign('product_parameter_values_product_id_foreign');
            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('cascade')
                ->change();
            $table->dropForeign('product_parameter_values_value_id_foreign');
            $table->foreign('value_id')
                ->references('id')->on('product_parameters_values')
                ->onDelete('cascade')
                ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
