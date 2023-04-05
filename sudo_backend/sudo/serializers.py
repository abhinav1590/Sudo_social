from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        
    def create(self, validated_data):
        post_id = self.context['view'].kwargs['post_id']
        user = self.context['request'].user
        text = validated_data.get('content')
        comment = Comment.objects.create(
            post_id=post_id,
            author=user,
            content=text
        )
        return comment
    

class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Like
        fields = '__all__'
    
    def create(self, validated_data):
        post_id = self.context['view'].kwargs['post_id']
        user = self.context['request'].user
        like = Like.objects.create(
            author=user,
            post_id=post_id
        )
        return like
    
class PostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    comment_count = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_comment_count(self, obj):
        return obj.comment_set.count()

    def get_like_count(self, obj):
        return obj.like_set.count()
