from django.shortcuts import render
import json
from django.http import JsonResponse
from rest_framework.views import APIView
import requests
# Create your views here.

class PostListView(APIView):
  def get(self, request, *args, **kwargs):
    posts = requests.get("https://jsonplaceholder.typicode.com/posts")
    content = posts.content
    stringified = content.decode('utf8').replace("'", '"')
    stringified = json.loads(stringified)
    return JsonResponse(stringified, safe=False)
