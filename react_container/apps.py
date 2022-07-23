from django.apps import AppConfig

class ReactContainerConfig(AppConfig):
    name = 'react_container'
    def ready(self):
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