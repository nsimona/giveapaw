## Tasks

### UI

[] front page - add all sections\
[] footer\
[] front page search\
[] top menus - handle close on click\
[] handle account tabs links\
[] handle top menu - redirect to search\

### Auth

- user\
  [x] FE update preferences - handle change, API request\
  [x] FE handle dropdowns - add aditional - no preference for each field\
  [x] FE create a map to handle en-bg and bg-en translation\
  [x] BE rename preference properties - nested {}?\
  [0] FE handle preferences change via redux (ignore for now - no need to implement for now - on refresh everything works :D)
  [x] BE create a publisher on pref change\
  [v2] BE create liseneter for application for the current user and lock preference updates\
- admin

### Pets

[x] BE handle conditional GET /pets; - admin should be able to see all pets - users see only active pets - users see their own pets no matter the status\
[v2] BE a user can also delete their pets\
[x] BE upload files (create pet)\
[x] BE upload files, handle validation, refactor current code\
[x] FE create a map to handle en-bg and bg-en translation\
[x] FE fetch update a pet\
[x] FE single pet - handle UI\
[x] FE search - add aditional options - no preference which removes from the query?\
[v2] FE handle delete pet ONLY by the owner\
[v2] BE create listener for application and lock updates if application is active\
[x] BE create listener for recommended pets (in the future)\
[x] BE update pet show - show only active pets (look below)\
[x] FE admins and pet owners still can see archived single pets, other users NO\
[x] FE update pet is not working (on save - it adds a new pet)\
[x] Consume recommended pets, store them in a collection\

- Lock updates for a pet if applications exists (v2)\
  [v2] Subscirbe for applications event\

### Applications

[x] HIGH PRIORITY service is currently unavailable\
[x] cancel all applications if there is 1 approved\

### Recommendations

[] setup redis\
[] Subscribe for pets and preferences upsert and store them\
[] Publish a msg with top 20 recommendations for each user\
[] Handle match route with real data\

## Basic requirements

[] Handle image upload [depends on BE]\
[x] Handle pet creation\
[x] Handle get pets query\
[x] Handle pet show (of a single pet)\
[x] Handle pet update\
[x] Handle search pet (all kinds) [depends on BE]\

[x] Handle logged in/out screens\
[x] Loading\

[x] Handle favorites [depends on BE]\
[x] Handle favorites display\
[] Handle adopters profile [depends on BE]\
[x] Handle my listed pets\

[x] Handle admin screen\
[x] Refactor favorites API\
[x] Clear warnings in console\

[x] Handle my applications\
[x] Handle application screen and API\
[x] Handle application different statuses\

[] Normalize data for pets display\

[BE] to do
[x] Handle favorites \
[] Handle image upload\
[x] Handle admin in auth service\
[x] Handle pet approval\
[] Handle preferences udpate (create nats event)\
[x] Handle pets search (send only necessary data cover pic, name, breed, age, size, gender)\
[] Handle multiple applications for a single pet (update type of applicationId in Pets)\

RECOMMENDATION SERVICE
[x] setup new service\
[x] 1 routes - match\
[] create listneres\
[] handle match\
[] handle recommendation\
[x] implement match UI\
[] implement recommendation interface\

skaffold command when dev fails:
skaffold dev --no-prune=false --cache-artifacts=false

build image
docker build -t nssimona/applications .
docker push nssimona/applications

to install ingress nginx
https://kubernetes.github.io/ingress-nginx/deploy/
