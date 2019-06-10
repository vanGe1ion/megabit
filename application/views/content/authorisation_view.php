
<form action="<?=Routes::LOGIN?>" method="post" name="authForm">
    <table align="center" width="300px" border="0" style="margin-top: 100px">
        <caption><h3>Пожалуйста, пройдите авторизацию</h3></caption>
        <tr>
            <td width="50px"><label for="login">Логин</label></td>
            <td width="50%"><input type="text" id="login" name="logname" placeholder="Логин" autofocus value="admin"></td>
        </tr>
        <tr>
            <td><label for="password">Пароль</label></td>
            <td width="50%"><input type="password" id="password" name="pass" placeholder="Пароль" value="123"></td>
        </tr>
        <tr>
            <td></td>
            <td width="50%"><button id="loginButton" class="auth" type="submit" value="Войти">Войти</button></td>
        </tr>
    </table>
</form>



<!-- После прочтения - сжечь компьютер =) -->
<p>
    <br>
    Test login (pass - 123):<br><br>

    admin<br>
    planner<br>
    serve<br>
    user<br>
    frozen<br>
</p>

