<!DOCTYPE html>
<html>
<head>
    <title>SMALL Login</title>
    <link rel="stylesheet" type="text/css" href="${url.resourcesPath}/css/login.css" />
</head>
<body>

<div class="container">
    <h1>SMALL Login Page</h1>

    <form method="post" action="${url.loginAction}">
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>
</div>

</body>
</html>
