from backend import settings

class TranslatedSerializerMixin(object):
    
    def to_representation(self, instance):
        inst_rep = super().to_representation(instance)
        request = self.context.get('request')
        lang_code = request.GET.get('lang_code', 'en')
        
        result = {}
        
        for field_name, field in self.get_fields().items():
            if field_name is not 'translations':
                field_value = inst_rep.pop(field_name)
                result.update({field_name: field_value})

            if field_name is 'translations':
                translations = inst_rep.pop(field_name)
                if lang_code not in translations:
                    parler_default_settings = settings.PARLER_LANGUAGES['default']
                    if 'fallback' in parler_default_settings:
                        lang_code = parler_default_settings.get('fallback')

                    if 'fallbacks' in parler_default_settings:
                        lang_code = parler_default_settings.get('fallbacks')[0]

                for lang, translation_fields in translations.items():
                    if lang == lang_code:
                        trans_rep = translation_fields.copy()  # make copy to use pop() from
                        for trans_field_name, trans_field in translation_fields.items():
                            field_value = trans_rep.pop(trans_field_name)
                            result.update({trans_field_name: field_value})

        return result