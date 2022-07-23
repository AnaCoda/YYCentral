from django.apps import AppConfig
class ReactContainerConfig(AppConfig):
    name = 'react_container'
    def ready(self):
        from .loadData import DataLoader
        DataLoader().Load_Events_Data()
        #DataLoader().Load_Restaurants_Data()