<%@ page language="java" import="java.util.*"contentType="text/html; charset=utf-8"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
  String username ="";
  String project ="";
  request.setCharacterEncoding("utf-8");//防止中文乱码
  
  username = request.getParameter("username");
  project  = request.getParameter("project");
  
  //如果用户和密码都等于admin，则登录成功
  if("宝宝".equals(username)&&(("贴吧".equals(project) )||("微博".equals(project) )||("社团".equals(project) )||("QQ群".equals(project) )||("资源".equals(project) )))
  {
      session.setAttribute("loginUser6", username);
      request.getRequestDispatcher("baobao.jsp").forward(request, response);
      //或者<jsp:forward page="user.jsp"/>
      //登录成功，使用服务器内部转发
  }
  else if("贴吧".equals(project) )
  {
      session.setAttribute("loginUser", username);
      request.getRequestDispatcher("login_success.jsp").forward(request, response);
      //登录成功，使用服务器内部转发
  }
 else if("微博".equals(project) )
  {
      session.setAttribute("loginUser1", username);
      request.getRequestDispatcher("login_success1.jsp").forward(request, response);
      //登录成功，使用服务器内部转发
  }
else if("社团".equals(project) )
  {
      session.setAttribute("loginUser2", username);
      request.getRequestDispatcher("login_success2.jsp").forward(request, response);
      //登录成功，使用服务器内部转发
  }
 else if("QQ群".equals(project) )
  {
      session.setAttribute("loginUser3", username);
      request.getRequestDispatcher("login_success3.jsp").forward(request, response);
      //登录成功，使用服务器内部转发
  }
  else if("资源".equals(project) )
  {
      session.setAttribute("loginUser4", username);
      request.getRequestDispatcher("resource.jsp").forward(request, response);
      //登录成功，使用服务器内部转发
  }
   else if("小起".equals(username))
  {
      session.setAttribute("loginUser5", username);
      request.getRequestDispatcher("xiaoqi.jsp").forward(request, response);
      //登录成功，使用服务器内部转发
  }
  
  else
  {
   response.sendRedirect("login_failure.jsp");
  }
%>
