<?php

namespace App\Http\Controllers\Api\Blog\Admin;

use App\Models\BlogPost;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use App\Jobs\BlogPostAfterCreateJob;
use App\Jobs\BlogPostAfterDeleteJob;

class PostController extends BaseController
{
    use DispatchesJobs;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = BlogPost::all();

        return $items;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $job = new BlogPostAfterCreateJob($item);
            $this->dispatch($job);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        BlogPostAfterDeleteJob::dispatch($id)->delay(20);
    }
}
