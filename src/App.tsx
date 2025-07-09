import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Users, Search, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Friend {
  id: string
  name: string
  username: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  mutualFriends: number
  lastSeen: string
  bio: string
  isFollowing: boolean
}

const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarahj',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1c3?w=300&h=300&fit=crop&crop=face',
    status: 'online',
    mutualFriends: 12,
    lastSeen: 'Just now',
    bio: 'Designer & coffee enthusiast ☕',
    isFollowing: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    username: '@mikechen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    status: 'away',
    mutualFriends: 8,
    lastSeen: '2 hours ago',
    bio: 'Full-stack developer 💻',
    isFollowing: false
  },
  {
    id: '3',
    name: 'Emma Wilson',
    username: '@emmaw',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    status: 'online',
    mutualFriends: 15,
    lastSeen: 'Active now',
    bio: 'Travel blogger & photographer 📸',
    isFollowing: true
  },
  {
    id: '4',
    name: 'David Rodriguez',
    username: '@davidr',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    status: 'offline',
    mutualFriends: 6,
    lastSeen: '1 day ago',
    bio: 'Musician & producer 🎵',
    isFollowing: false
  },
  {
    id: '5',
    name: 'Lisa Park',
    username: '@lisap',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
    status: 'online',
    mutualFriends: 20,
    lastSeen: 'Just now',
    bio: 'UX Designer & sketch artist ✏️',
    isFollowing: true
  },
  {
    id: '6',
    name: 'James Thompson',
    username: '@jamesth',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
    status: 'away',
    mutualFriends: 9,
    lastSeen: '30 minutes ago',
    bio: 'Fitness coach & nutritionist 💪',
    isFollowing: false
  },
  {
    id: '7',
    name: 'Rachel Kim',
    username: '@rachelk',
    avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=300&h=300&fit=crop&crop=face',
    status: 'online',
    mutualFriends: 14,
    lastSeen: 'Active now',
    bio: 'Marketing manager & content creator 📱',
    isFollowing: true
  },
  {
    id: '8',
    name: 'Alex Turner',
    username: '@alext',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face',
    status: 'offline',
    mutualFriends: 4,
    lastSeen: '3 hours ago',
    bio: 'Software architect & tech lead 🚀',
    isFollowing: false
  },
  {
    id: '9',
    name: 'Sophia Martinez',
    username: '@sophiam',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
    status: 'online',
    mutualFriends: 18,
    lastSeen: 'Just now',
    bio: 'Graphic designer & illustrator 🎨',
    isFollowing: true
  },
  {
    id: '10',
    name: 'Tom Anderson',
    username: '@toma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    status: 'away',
    mutualFriends: 7,
    lastSeen: '1 hour ago',
    bio: 'Data scientist & AI researcher 🤖',
    isFollowing: false
  },
  {
    id: '11',
    name: 'Maya Patel',
    username: '@mayap',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
    status: 'online',
    mutualFriends: 25,
    lastSeen: 'Active now',
    bio: 'Product manager & startup founder 💡',
    isFollowing: true
  },
  {
    id: '12',
    name: 'Ryan Cooper',
    username: '@ryanc',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&h=300&fit=crop&crop=face',
    status: 'offline',
    mutualFriends: 11,
    lastSeen: '2 days ago',
    bio: 'Photographer & videographer 📹',
    isFollowing: false
  }
]

function App() {
  const [friends, setFriends] = useState<Friend[]>(mockFriends)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || friend.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const toggleFollow = (friendId: string) => {
    setFriends(prev => prev.map(friend => 
      friend.id === friendId ? { ...friend, isFollowing: !friend.isFollowing } : friend
    ))
  }

  

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800'
      case 'away': return 'bg-yellow-100 text-yellow-800'
      case 'offline': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-300 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-red-600" />
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Like a Wall of Friends</h1>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-5 w-5 mr-2" />
              Add Friend
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={selectedStatus === 'online' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('online')}
              size="sm"
              className={selectedStatus === 'online' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              Online
            </Button>
            <Button
              variant={selectedStatus === 'away' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('away')}
              size="sm"
              className={selectedStatus === 'away' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
            >
              Away
            </Button>
            <Button
              variant={selectedStatus === 'offline' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('offline')}
              size="sm"
              className={selectedStatus === 'offline' ? 'bg-gray-600 hover:bg-gray-700' : ''}
            >
              Offline
            </Button>
          </div>
        </div>
      </div>

      {/* Friends List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ul className="space-y-4">
          {filteredFriends.map((friend) => (
            <li key={friend.id} className="bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center p-4 space-x-4">
                <Avatar className="h-16 w-16 ring-2 ring-white shadow-md">
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback className="bg-gradient-to-br from-red-500 to-yellow-500 text-white text-xl font-bold">
                    {friend.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{friend.name}</h3>
                  <p className="text-sm text-gray-500">{friend.username}</p>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs mt-1 ${getStatusBadgeColor(friend.status)}`}
                  >
                    {friend.status.charAt(0).toUpperCase() + friend.status.slice(1)}
                  </Badge>
                  <p className="mt-2 text-gray-700 text-sm line-clamp-2">{friend.bio}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-5 w-5" />
                      <span>{friend.mutualFriends} mutual friends</span>
                    </div>
                    <div className="text-xs">
                      Last seen: {friend.lastSeen}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant={friend.isFollowing ? "secondary" : "default"}
                    onClick={() => toggleFollow(friend.id)}
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <Heart className={`h-5 w-5 ${friend.isFollowing ? 'fill-current' : ''}`} />
                    <span>{friend.isFollowing ? 'Liked' : 'Like'}</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* No Results */}
        {filteredFriends.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No friends found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )

}

export default App