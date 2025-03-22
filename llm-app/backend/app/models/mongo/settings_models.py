from datetime import datetime
from mongoengine import (
    Document,
    StringField,
    IntField,
    FloatField,
    BooleanField,
    DictField,
    ListField,
    DateTimeField,
)


class SettingsDocument(Document):
    key = StringField(required=True, unique=True)
    value_type = StringField(
        required=True,
        choices=["string", "int", "float", "boolean", "dict", "list", "datetime"],
    )

    # Different value fields based on type
    string_value = StringField()
    int_value = IntField()
    float_value = FloatField()
    boolean_value = BooleanField()
    dict_value = DictField()
    list_value = ListField()
    datetime_value = DateTimeField()

    description = StringField()
    group = StringField()  # For categorizing configs
    last_updated = DateTimeField(default=datetime.now)

    meta = {
        "collection": "settings",
        "indexes": [{"fields": ["key"], "unique": True}, {"fields": ["group"]}],
    }

    def get_value(self):
        if self.value_type == "string":
            return self.string_value
        elif self.value_type == "int":
            return self.int_value
        elif self.value_type == "float":
            return self.float_value
        elif self.value_type == "boolean":
            return self.boolean_value
        elif self.value_type == "dict":
            return self.dict_value
        elif self.value_type == "list":
            return self.list_value
        elif self.value_type == "datetime":
            return self.datetime_value
        return None

    def set_value(self, value):
        if self.value_type == "string":
            self.string_value = value
        elif self.value_type == "int":
            self.int_value = value
        elif self.value_type == "float":
            self.float_value = value
        elif self.value_type == "boolean":
            self.boolean_value = value
        elif self.value_type == "dict":
            self.dict_value = value
        elif self.value_type == "list":
            self.list_value = value
        elif self.value_type == "datetime":
            self.datetime_value = value
        self.last_updated = datetime.now()
