<?php

namespace App\Http\Controllers;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         // 使用 `with` 方法載入 user 關聯，避免 N+1 問題
         $messages = Message::with('user:id,name,email')->get();

         return response()->json($messages);
        // return Message::findAll();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(['user_id'=>'required','name'=>'required']);

        return Message::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // 使用 `with` 方法載入 user 關聯
        $message = Message::with('user:id,name,email')->find($id);

        // if (!$message) {
        //     return response()->json(['message' => 'Message not found'], 404);
        // }

        return response()->json($message);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $message = Message::find($id);
        $this->authorize('update', $message);
        $message->update($request->all());
        return $message;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $message = Message::find($id);
        $this->authorize('delete', $message);
        return $message->delete();
    }
}
