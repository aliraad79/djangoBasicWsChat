from django.shortcuts import render, redirect


def index(request):
    if request.method == "POST":
        room_code = request.POST.get("room_code")
        username = request.POST.get("username")
        return redirect(f"/chat/{room_code}?&username={username}")
    return render(request, "index.html", {})


def chat(request, room_code):
    username = request.GET.get("username")
    return render(request, "chat.html", {"room_code": room_code, "username": username})
