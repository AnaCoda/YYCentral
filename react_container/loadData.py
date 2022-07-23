from django.apps import AppConfig

from react_container.models import Restaurant

class DataLoader():
    def Load_Events_Data(self):
        from .models import Event
        import pandas as pd
        from sodapy import Socrata
        client = Socrata("data.calgary.ca", None)
        results = client.get("n625-9k5x", limit=2000)
        results_df = pd.DataFrame.from_records(results)
        results_df = results_df[['address', 'notes', 'title', 'event_type', 'more_info_url', 'all_dates', 'longitude', 'latitude', 'host_organization']]
        results_df = results_df[results_df.host_organization != "City of Calgary"]
        results_records = results_df.to_dict('records')

        result_instances = [Event(
            title=result['title'],
            notes=result['notes'],
            address=result['address'],
            event_type=result['event_type'],
            url=result['more_info_url'],
            all_dates=result['all_dates'],
            latitude=float(result['latitude']),
            longitude=float(result['longitude'])
        ) for result in results_records]
        
        Event.objects.all().delete()
        Event.objects.bulk_create(result_instances)
    
    def Load_Restaurants_Data(self):
        from .models import Event
        import pandas as pd
        import csv
        import geocoder
        from geopy.geocoders import Nominatim

        result_instances = []
        geolocator = Nominatim(user_agent="MyApp")
        with open('react_container/files/CalgaryRestaurants.csv') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                address = row[1]
                location = geolocator.geocode(address)
                if location is not None:
                    try:
                        newRestaurant = Restaurant(row[0], address, row[2], row[3], row[4], row[5], row[6], location.latitude, location.longitude)
                        result_instances.append(newRestaurant)
                    except:
                        pass
        Restaurant.objects.all().delete()
        Restaurant.objects.bulk_create(result_instances)