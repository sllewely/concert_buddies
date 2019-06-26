require 'rails_helper'

RSpec.describe 'Friendship Requests Responses API', type: :request do
  let(:user) { create :user }
  let(:user2) { create :user, first_name: 'Jim' }

  before do
    sign_in user
  end

  describe 'POST /friendship_requests/' do
    it 'creates a new friendship request with the given user' do
      post "/api/v1/friendship_requests", params: { pending_friend_id: user2.id }, as: :json

      friendship_request = FriendshipRequest.first
      expect(friendship_request.requesting_friend_id).to eq(user.id)
      expect(friendship_request.pending_friend_id).to eq(user2.id)

      # verify requesting friend associations
      expect(user.pending_friends).to eq([user2])
      expect(user.pending_friendship_requests).to eq([friendship_request])
      expect(user.requesting_friends).to eq([])
      expect(user.requesting_friendship_requests).to eq([])

      # verify pending (receiving) friend associations
      expect(user2.pending_friends).to eq([])
      expect(user2.pending_friendship_requests).to eq([])
      expect(user2.requesting_friends).to eq([user])
      expect(user2.requesting_friendship_requests).to eq([friendship_request])
    end
  end

  describe 'GET /friendship_requests/' do
    xit 'gets all pending friendship requests' do
      get '/api/v1/friendship_requests', params: { format: :json }
    end
  end

  describe 'POST /friendship_requests/:uuid/confrim' do
    xit 'accepts the given friendship request and creates a friendship relation' do
      post "/api/v1/friendship_requests/#{user2.id}/confirm"
    end
  end

  describe 'POST /friendship_requests/:uuid/reject' do
    xit 'rejects the given friendship request' do
      post "/api/v1/friendship_requests/#{user2.id}/reject"
    end
  end
end