<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<meta charset="utf-8">

<!-- Create a div where the graph will take place -->
<div id="my_dataviz"></div>


<html>
<head>
 
<title>Home</title>
    <%@include file="./common_resource.jsp"%>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/home.js"></script>
    <link href="${pageContext.request.contextPath}/resources/css/home.css" rel="stylesheet" />
 
</head>
<body>
<!--
    <h1>Hello world!</h1>
    <button id = "load_wineList" type = "button">와인 목록 가져오기</button>
    <table>
        <thead>
            <tr>
                <th>product_seq</th>
                <th>fuxed_acidity</th>
                <th>volatile_acidity</th>
                <th>citric_acid</th>
                <th>residual_sugar</th>
                <th>chlorides</th>
                <th>free_sulfur_dioxide</th>
                <th>total_sulfur_dioxide</th>
                <th>density</th>
                <th>pH</th>
                <th>sulphates</th>
                <th>alcohol</th>
                <th>quality</th>
            </tr>
        </thead>
        <tbody id ="wineList">
            
            
        </tbody>
    </table>
 
-->
</body>
</html>
