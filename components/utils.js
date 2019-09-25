import FlexAPI from '../flexapi'

class Utils {
    existingUniqueValues(module_name, field_name) {
        return FlexAPI.get('utils/exiting_unique_values/' + module_name + '/' + field_name);
    }
}

export default new Utils();
