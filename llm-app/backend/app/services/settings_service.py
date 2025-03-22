from app.models.mongo.settings_models import SettingsDocument
from datetime import datetime


class SettingsService:
    @staticmethod
    def get_config(key: str, default=None):
        try:
            config = SettingsDocument.objects.get(key=key)
            return config.get_value()
        except SettingsDocument.DoesNotExist:
            return default

    @staticmethod
    def set_config(key: str, value, value_type=None, description=None, group=None):
        """Create or update a config"""
        try:
            config = SettingsDocument.objects.get(key=key)
            if value_type and config.value_type != value_type:
                config.value_type = value_type
            config.set_value(value)
            if description:
                config.description = description
            if group:
                config.group = group
        except SettingsDocument.DoesNotExist:
            if not value_type:
                # Infer type if not specified
                if isinstance(value, str):
                    value_type = "string"
                elif isinstance(value, int):
                    value_type = "int"
                elif isinstance(value, float):
                    value_type = "float"
                elif isinstance(value, bool):
                    value_type = "boolean"
                elif isinstance(value, dict):
                    value_type = "dict"
                elif isinstance(value, list):
                    value_type = "list"
                elif isinstance(value, datetime.datetime):
                    value_type = "datetime"
                else:
                    value_type = "string"

            config = SettingsDocument(
                key=key, value_type=value_type, description=description, group=group
            )
            config.set_value(value)

        config.save()
        return config

    @staticmethod
    def get_configs_by_group(group):
        """Get all configs in a group"""
        return {c.key: c.get_value() for c in SettingsDocument.objects(group=group)}

    @staticmethod
    def get_all_configs():
        """Get all configs as a dictionary"""
        return {c.key: c.get_value() for c in SettingsDocument.objects.all()}
