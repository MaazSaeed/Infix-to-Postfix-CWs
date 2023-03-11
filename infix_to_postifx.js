function toPostfix (expr) 
{
  expr = expr.match(/[a-z\d]+|\^|\,|\bPI\d*|\bPI2|\===|\d+|\+|\-|\*|\/|\(|\)/g);
  let len = expr.length;
  
  // shunting yard algorithm
  
  let stack = [];
  let queue = [];
  
  for(let i = 0; i < len; ++i)
  {
  	let ch = expr[i];    
    if(ch == '(' || ch == '^')
    	stack.push(ch);
    else if(!isNaN(ch)) // numbers pushed onto the queue
        queue.push(ch);
    else if(ch == ')')
    {
    	while(stack.length && stack[stack.length - 1] != '(')
			queue.push(stack.pop());
    	stack.pop();
	}  
	else
    {
    	if(precedence(ch) > precedence(stack[stack.length - 1]))
            stack.push(ch);
        else
        {
          while(stack.length && precedence(ch) <= precedence(stack[stack.length - 1]))
            queue.push(stack.pop());
          stack.push(ch);
        }
    }
  }

	while(stack.length)
      queue.push(stack.pop());
  
  return queue.join('');
}

function precedence(ch)
{
  if(ch == '+' || ch == '-')
    return 1;
  if(ch == '*' || ch == '/')
    return 2;
  if(ch == '^')
    return 3;
  return 0;
}
