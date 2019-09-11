# FlexAPI - JS Client

Using:

```js
// Initialization
FlexAPI.setToken('AccessToken');
FlexAPI.setCRMUrl('https://crmurl');
```

### ListView
```js
Listing.list(
    'ModuleName',
    ['fieldname1', 'fieldname2'],
    100,
    1,
    'fieldname1',
    'ASC'
).then((response) => {
    // Response is of type Record[]
});

```