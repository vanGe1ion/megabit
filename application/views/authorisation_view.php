
<form action="<?=Routes::LOGIN?>" method="post" name="authForm">
    <table align="center" width="300px" border="0" style="margin-top: 100px">
        <caption><h3>Пожалуйста, пройдите авторизацию</h3></caption>
        <tr>
            <td width="50px"><label for="login">Логин</label></td>
            <td width="50%"><input type="text" id="login" name="logname"></td>
        </tr>
        <tr>
            <td><label for="password">Пароль</label></td>
            <td width="50%"><input type="password" id="password" name="pass"></td>
        </tr>
        <tr>
            <td></td>
            <td width="50%"><button class="loging" type="submit" value="Войти">Войти</button></td>
        </tr>
    </table>
</form>
<!-- После прочтения - сжечь компьютер =) -->
    <p>
        <br>
        Test accounts:<br><br>
        Login - Password<br><br>
        admin - admin<br>
        planner - planner<br>
        serve - serve<br>
        ea.kichaev - 123<br>
        frozen - 123<br>
    </p>

