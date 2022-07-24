from multiprocessing import Event


from react_container.models import Event, Restaurant
class utils:
    def getNClosest(self, lat, lng, n):
        events = Event.objects.all()
        closest = []
        for event in events:
            dist = self.getDistance(lat, lng, event.lat, event.lng)
            closest.append((event, dist))
        closest.sort(key=lambda x: x[1])
        return closest[:n]
        
    